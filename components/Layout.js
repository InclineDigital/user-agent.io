import Head from 'next/head'
import Link from 'next/link'


const Layout = ({
  title="🖥 ️📱 💻 📟 What's My User Agent?",
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

    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
      <div className="container">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/">What's My User Agent?</a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-md-0">
           {/*
            <li className="nav-item active">
              <a className="nav-link" href="=">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://www.incline.systems/" title="React and Next.js Experts">◢ Incline</a>
            </li>
            */ }
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="email"/>
            <input className="form-control mr-sm-2" type="password" placeholder="password"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Log In</button>
          </form>
          <Link href="/signup">
            <button className="btn btn-primary my-2 my-sm-0 ml-2">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>


    {children}

    <footer>
      <div className="container">
        <p><a href="http://www.incline.systems/">◢ Built by Incline with React, Next.js, Node.js, &amp; Bootstrap</a></p>
      </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossOrigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossOrigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossOrigin="anonymous"></script>
  </div>
)

export default Layout
