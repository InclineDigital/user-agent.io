import React from 'react';
import Guid from 'guid';
import Layout from '../components/Layout.js'
import BannerAdd from '../components/BannerAdd'
import UA from '../components/UA'

class Host extends React.Component {

  getInitialState() {
    return {
      ua: "Awaiting remote user...",
      detail: "See below for your link to give out."
    };
  }

  componentDidMount() {
    let guid = this.props.guid;
    // todo: open WS connection with server update state when data is received
  }

  render() {
    const guid = this.props.guid;
    const source = "Remote user:";
    const {ua, detail} = this.state;
    return (
    <Layout>
      <main>

        <UA source={source} ua={ua} detail={detail} />

        <section className="container">
          <BannerAdd/>

          <p>
            Have someone click this link: <input value={`http://user-agent.io/share/${guid}`} readOnly />
          </p>

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
