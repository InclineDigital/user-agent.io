// general analytics tracking
// note: this code will only work client-side,
// so it should be called in componentDidMount or event handlers

let initialized = false;
export const initAnalytics = () => {
  if (initialized) {
    return;
  }
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-97706767-2', 'auto');
  //ga('send', 'pageview'); - we'll do this in Layout.js's componentDidMount

  initialized = true;
};

export const trackPageview = (url=location.pathname) => {
  ga('set', 'page', url);
  ga('send', 'pageview');
};

/**
 * Track an action other than a pageview
 * @param {String} category - Typically the object that was interacted with (e.g. 'Video')
 * @param {String} action - The type of interaction (e.g. 'play')
 * @param {String} [label] - Useful for categorizing events (e.g. 'Fall Campaign')
 * @param {Number} [value] - A numeric value associated with the event (e.g. 42)
 */
export const trackEvent = (category, action, label, value) => {
  ga('send', 'event', category, action, label, value);
};

export const trackException = (message, isFatal=false) => {
    ga('send', 'exception', {
      'exDescription': err.message || err,
      'exFatal': isFatal
    });
}
