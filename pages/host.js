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
      ua: null,
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
      const { ua, ip, revDns } = JSON.parse(msg.data);
      this.setState({
        ua,
        ip,
        revDns,
        time: new Date,
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
