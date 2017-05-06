import Layout from '../src/components/Layout.js';

export default function Signup() {
  return (
    <Layout title="See Someone Else's User-Agent">
      <main>

        <section className="jumbotron">
          <div className="container">
            <h1>
              See Someone Else's User Agent
            </h1>
            <p>Sign up to get a simple link that you can give to someone else and then you can see their user-agent as soon as they click it.</p>
          </div>
        </section>

        <section className="container">
          <div className="card-deck">
            <div className="card">
              {/* todo: get some pics or emojis or something here
               <img className="card-img-top" src="..." alt="Card image cap"> */}
              <div className="card-block">
                <h4 className="card-title">📟 Basic - $5</h4>
                <ul>
                  <li>
                    Get a customizable link that you can share with your users.
                    When they click it, you will instantly see their user-agent.
                  </li>
                  <li><b>No Ads</b> for you or your users</li>
                  <li>History of 10 most-recent visitors to your link</li>
                  <li>FREE 30-day trial</li>
                </ul>
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </div>
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">️📱 Pro - $25</h4>
                <ul>
                  <li>All basic features</li>
                  <li>Embeddable widget - coming soon</li>
                  <li>History of 100 most-recent visitors</li>
                  <li>FREE 30-day trial</li>
                </ul>
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </div>
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">💻 Business - $499</h4>
                <ul>
                  <li>Up to 100 pro-level users</li>
                  <li><abbr title="Service Level Agreement">SLA</abbr></li>
                  <li>100 most recent visitors recorded for widget - coming soon</li>
                </ul>
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </div>
          <p>
            🖥 Need even more users? More history? White-labeling? On-prem deployment?
            {' '}
            <a href="mailto:sales@user-agent.io?subject=Enterprise%20Account&body=Hi%2C%20I'm%20interested%20in%20an%20enterprise%20account%20for%20user-agent.io%2C%20my%20business%20needs...
">
              Contact us today about an enterprise plan
            </a>
            .
          </p>
        </section>
      </main>
    </Layout>
  );
}
