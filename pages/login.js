import Link from 'next/link';
import Layout from '../src/components/Layout.js';

const Login = ({ uaOpts }) => (
  <Layout title="Log In">
    <main>
      <section className="container">

        <form action="/login" method="POST">
          <h2>Log In</h2>
          <fieldset className="form-group">
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input className="form-control" type="email" name="username" id="email" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input className="form-control" type="password" name="password" id="password" />
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-sm-2 col-sm-10">
                <button type="submit" className="btn btn-primary mr-2">Log In</button>
                <Link href="/signup"><a type="submit" className="btn btn-success">Sign Up</a></Link>
              </div>
            </div>
          </fieldset>
        </form>

      </section>
    </main>
  </Layout>
);

export default Login;
