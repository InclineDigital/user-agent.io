# To Do

* look at the free version of https://deviceatlas.com/pricing?form=cloud-free
  * see https://mobiforge.com/design-development/javascript-server-side-rendering-with-device-detection

* improve design
  * highlight the url on the host page
  * disable my hosts add blocker to see what the ads look like
  * get a color scheme


* build out account features to remember previous UAs
  * allow account creation
    * use bcrypt
    * consider allowing oauth (optional)
  * allow logging in
  * remember logged-in status in a cookie (optional, but desired)
  * allow url customization
  * differentiate between anon and custom URLs
    * perhaps just isGuid()? 
    * or an extra prefix on anon's
    * or allow no prefix on customs - check performance impact, consider preloading list into mem
  * on custom hit, store in db

* charge money

* look into https://github.com/googleanalytics/autotrack#loading-autotrack-via-npm

