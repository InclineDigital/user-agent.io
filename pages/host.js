import React from 'react';
import Guid from 'guid';
import TimeAgo from 'react-timeago'
import Layout from '../components/Layout.js'
import BannerAdd from '../components/BannerAdd'
import UA from '../components/UA'


class Host extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.retry_delay = 10;
    this.state = {
      ua: "Awaiting remote user...",
      link: false,
    };
  };

  openSocket() {
    console.log('opening socket');
    let guid = this.props.guid;
    let socket = this.socket = new WebSocket(`${location.protocol.replace('http', 'ws')}//${location.host}/host/${guid}`);
    socket.onopen = () => {
      console.log('socket open, sending guid', guid);
      this.retry_delay = 10;
      socket.send(JSON.stringify({guid}));
    };
    socket.onclose = (code) => {
      // exponential backoff starting at 100 ms
      this.retry_delay = this.retry_delay * this.retry_delay;
      console.log('socket closed with ' + code + ', reconnecting in ' + this.retry_delay + ' ms');
      setTimeout(this.openSocket, this.retry_delay);
    };
    socket.onerror = (err) => {
      console.log('socket error', err);
      this.setState({ua: 'Error in WebSocket connection'});
    };
    socket.onmessage = (msg) => {
      console.log('websocket message', msg);
      const { ua } = JSON.parse(msg.data);
      this.setState({
        ua,
        time: new Date,
        link: true,
      })
    }
  }

  componentDidMount() {
    this.openSocket();
  }

  componentWillUnmount() {
    this.socket && this.socket.close();
  }

  get clientLink() {
    const guid = this.props.guid;
    const base = (typeof location !== 'undefined') ? `${location.protocol}//${location.host}` : 'http://user-agent.io';
    return `${base}/share-with/${guid}`;
  }

  render() {
    const source = "Remote User Agent:";
    const {ua, time, link} = this.state;
    const url = this.clientLink;
    return (
    <Layout>
      <main>

        <UA source={source} ua={ua} detail={time ? <TimeAgo date={time} minPeriod={60} /> : 'See below for your link to give out.'} link={link} />

        <section className="container">
          <BannerAdd/>

          <div className="form-group row">
            <label htmlFor="link" className="col-sm-4 col-form-label">Have someone click this link: </label>
            <div className="col-sm-8">
              <input className="form-control" value={url} readOnly onClick={(e)=>e.target.select()} id="link" />
            </div>
          </div>

          <BannerAdd/>

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
