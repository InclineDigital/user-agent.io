import Link from 'next/link'
import Head from 'next/head'

import Layout from '../components/Layout.js'
import BannerAdd from '../components/BannerAdd'
import UA from '../components/UA'

const Index = ({uaOpts}) => (
  <Layout>
    <Head>
      <link rel="canonical" href="http://www.user-agent.io/" />
    </Head>
    <main>

     <UA {...uaOpts} />

      <section className="container">
        <BannerAdd/>

        <h2 style={{marginBottom: '30px'}}>
          <Link>
            <a href="/host" className="text-success">
              <b>New:</b> See someone else's User Agent! <button className="btn btn-success">Click Here</button>
            </a>
          </Link>
        </h2>

        <h2>What is a "User Agent" anyways?</h2>
        <p>A <a href="https://en.wikipedia.org/wiki/User_agent#Use_in_HTTP">User Agent</a> is
          a short string that web browsers and other applications send to identify themselves to web servers.
          The format is defined in <a href="https://tools.ietf.org/html/rfc7231#section-5.5.3">RFC 7231</a>.
        </p>
        <p>Unfortunately, most browsers falsify part of their User-Agent header in an attempt to be compatible with more web servers.
          Here is a <a href="http://webaim.org/blog/user-agent-string-history/">rather humorous history</a> of how it all started.
        </p>

        <h2>Tips</h2>
        <ul>
          <li>Click on your user-agent string (at the top) to get a link that you can share with other people.</li>
          <li>Visit <code>user-agent.io/ua/[any-user-agent-string]</code>, the site will give you a breakdown for that string.</li>
          <li>If something is missing or wrong, or you have any other ideas for improving the site, please <a href="https://github.com/nfriedly/user-agent.io">send an issue or pull request on Github <i className="fa fa-github"></i></a>.</li>
        </ul>

      </section>
    </main>
  </Layout>
)

const getUaOpts = ({req, query}) => {
  const sharing = !!(query && 'sharing' in query);
  if (query && query.ua) {
    return {
        ua: query.ua,
        source: 'Viewing:'
    }
  } else if (req) {
    return {
        ua: req.headers['user-agent'] || '(No User-Agent header provided)',
        source: 'Your User-Agent is:',
        detail: sharing ? 'You are sharing your user-agent' : null
    }
  } else if (typeof navigator !== 'undefined') {
    return {
      ua: navigator.userAgent || '(No navigator.userAgent provided)',
      source: 'Your User-Agent is:',
      detail: sharing ? 'You are sharing your user-agent' : null
    }
  }
  return {
      ua: '?'
  }
};

Index.getInitialProps = (props) => {
  const uaOpts = getUaOpts(props);
  return {
    uaOpts
  }
};

export default Index
