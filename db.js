require('dotenv').config({silent: true});
const nano = require('nano');
const URL = require('url').URL;
const vcapServices = require('vcap_services');


const credentials = Object.assign(
  {},
  vcapServices.getCredentials('cloudantNoSQLDB'),
  {
    username: process.env.COUCHDB_USERNAME,
    password: process.env.COUCHDB_PASSWORD,
    url: process.env.COUCHDB_URL || 'http://localhost:5984',
    dbname: process.env.DB_NAME || 'user_agent_io'
  }
);
const url = new URL(credentials.url);
if (credentials.username) {
  url.username = credentials.username;
}
if (credentials.password) {
  url.password = credentials.password;
}
const conn = nano(url.href);
const db = conn.use(credentials.dbname);

const ERROR_USER_NOT_FOUND = "user not found";

const getUser = (email) => new Promise( (resolve, reject) => {
  if (!email) {
    reject("email is required")
  }
  return db.view('users', 'byEmail', {key: email}, (err, body)=>  {
    if (err) {
      reject(err)
    } else {
      if (body.rows.length) {
        resolve(body.rows[0])
      } else {
        reject("user not found")
      }
    }
  })
});

const userExists = (email) => getUser(email)
  .then(user => true)
  .catch(e => {
    if (e === ERROR_USER_NOT_FOUND) {
      return false;
    } else {
      throw e;
    }
});

const ERROR_EMAIL_ALREADY_REGISTERED = "that email address is already registered to an existing user";

const createUser = (user) =>
  new Promise( (resolve, reject) =>
    userExists(user.email)
      .then(isAlreadyRegistered => {
        if (isAlreadyRegistered) {
          reject(ERROR_EMAIL_ALREADY_REGISTERED)
        } else {
          return db.insert(user, (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          })
        }
      })
  );


module.exports = {
  conn,
  db,
  ERROR_USER_NOT_FOUND,
  ERROR_EMAIL_ALREADY_REGISTERED,
  createUser,
  getUser,
  userExists
};
