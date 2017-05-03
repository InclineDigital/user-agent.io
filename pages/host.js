import React from 'react';
import Guid from 'guid';
import TimeAgo from 'react-timeago'
import Layout from '../components/Layout.js'
import { BannerAd } from '../components/Ads'
import UA from '../components/UA'
import { trackEvent, trackException } from '../lib/analytics'

class Host extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.retry_delay = 10;
    this.state = {
      ua: null,
    };
  };

  openSocket() {
    let guid = this.props.guid;
    let socket = this.socket = new WebSocket(`${location.protocol.replace('http', 'ws')}//${location.host}/host/${guid}`);
    socket.onopen = () => {
      this.retry_delay = 10;
      socket.send(JSON.stringify({guid})); // this isn't needed anymore, but meh
    };
    socket.onclose = ({code, reason, wasClean}) => {
      // exponential backoff starting at 100 ms
      this.retry_delay = this.retry_delay * this.retry_delay;
      console.log(`WebSocket connection closed with ${code} ${reason}; clean: ${wasClean}; reconnecting in ${this.retry_delay} ms`);
      setTimeout(this.openSocket, this.retry_delay);
      trackException(`WebSocket connection closed with ${code} ${reason}`, wasClean);
    };
    socket.onerror = (err) => {
      console.log('WebSocket error', err);
      this.setState({
        ua: 'Error in WebSocket connection',
        time: new Date,
        ip: null,
        revDns: null
      });
      trackException('WebSocket connection error')
    };
    socket.onmessage = (msg) => {
      console.log('WebSocket message', msg);
      const { ua, ip, revDns } = JSON.parse(msg.data);
      this.setState({
        ua,
        ip,
        revDns,
        time: new Date,
      });
      trackEvent('host', 'client visited', ua)
    }
  }

  componentDidMount() {
    this.openSocket();
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.onclose = null; // don't automatically reconnect
      this.socket.close();
    }
  }

  get clientLink() {
    const guid = this.props.guid;
    const base = (typeof location !== 'undefined') ? `${location.protocol}//${location.host}` : 'http://user-agent.io';
    return `${base}/share-with/${guid}`;
  }

  onLinkTextClick(e) {
    e.target.select();
    trackEvent('host', 'link selected')
  }

  render() {
    const source = "Remote User Agent:";
    const {ua, time, ip, revDns} = this.state;
    const url = this.clientLink;
    return (
    <Layout>
      <main>

        {ua ?
         <UA source={source} ua={ua} detail={<span>{revDns} {ip} (<TimeAgo date={time} />)</span>} />
          :  <UA source={source} ua='Awaiting remote user...' detail='See below for your link to give out.' link={false} />
        }

        <section className="container">

          <div className="form-group row">
            <label htmlFor="link" className="col-sm-4 col-form-label">Have someone click this link: </label>
            <div className="col-sm-8">
              <input className="form-control" value={url} readOnly onClick={this.onLinkTextClick} id="link" />
            </div>
          </div>

          <BannerAd/>

        </section>
      </main>
    </Layout>
    )
  }
}

Host.getInitialProps = () => ({
  guid: Guid.raw()
});

export default Host;
