import Head from 'next/head'

const Layout = ({
  title="What's My User Agent?",
  children
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous" />
    </Head>
    <style jsx>
      {`
      nav .container {
        display: flex;
      }
      footer {
       margin-top: 2rem;
      }
      footer .container {
        border-top: 1px solid #ccc;
        padding: 2rem 0;
      }
      footer p:last-child {
        margin-bottom: 0;
      }
    `}
    </style>

    <nav className="navbar">
      <div className="container">

        <a className="navbar-brand" href="/">What's My User Agent?</a>

        <ul className="navbar-nav mr-0 ml-auto mt-2 mt-md-0">
          <li className="nav-item">
            <a className="nav-link" href="http://www.incline.systems/" title="React and Next.js Experts">◢ Incline</a>
          </li>
        </ul>
      </div>
    </nav>

    {children}

    <footer>
      <div className="container">
        <p><a href="http://www.incline.systems/">◢ Built by Incline with React, Next.js Node.js, &amp; Bootstrap</a></p>
      </div>
    </footer>
    { /*
    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossOrigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossOrigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossOrigin="anonymous"></script>
    */ }
  </div>
)

export default Layout
