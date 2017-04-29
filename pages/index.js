import Layout from '../components/Layout.js'
import BannerAdd from '../components/BannerAdd'
import Link from 'next/link'

const Index = ({ua}) => (
  <Layout>

    <main>

      <section className="jumbotron">
        <div className="container">
          <h1>
            <Link as={`/ua/${ua}`} href={`/?ua=${ua}`}>
              <a>{ua}</a>
            </Link>
          </h1>
        </div>
      </section>

      <section className="container">
        <BannerAdd/>

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

Index.getInitialProps = ({req, query}) => {
  return {
    ua:  (query && query.ua) || (req && req.headers['user-agent']) || '?'
  }
}

export default Index
