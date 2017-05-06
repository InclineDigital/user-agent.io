module.exports = {
  start: browser => {
    browser.url('http://localhost:3000/host');
    browser.waitForElementVisible('div[data-reactroot]', 1000);
  },

  'host page loads': browser => {
    // browser.title(function(title) {
    //   console.log('title: ', title);
    // });
    // browser.source(function() {
    //   console.log(arguments);
    // });
    browser.waitForElementVisible('input[readonly]', 1000);
    browser.assert.containsText('.jumbotron', 'Awaiting remote user...');
  },

  'second user clicks host link': browser => {
    browser.getValue('input[readonly]', function(result) {
      browser.assert.equal(typeof result, 'object');
      browser.assert.equal(result.status, 0);
      // todo: figure out how to give the second window a different UA
      browser.execute(`window.open('${result.value}', 'secondUserWindow', '_blank')`);
      browser.switchWindow('secondUserWindow', function() {
        browser.assert.urlContains('?shared=true');
        browser.waitForElementVisible('div[data-reactroot]', 1000);
        browser.assert.title("What's My User Agent? 🖥 📱 💻 📟");
        browser.assert.visible('.jumbotron');
        browser.verify.containsText('.jumbotron', 'Mozilla');
        browser.verify.containsText('.jumbotron', 'Your user-agent was shared');
        browser.closeWindow();
      });
    });
  },

  "first user's page has updated": browser => {
    browser.window_handles(function(result) {
      const handle = result.value[0];
      browser.switchWindow(handle);
      browser.assert.urlContains('/host');
      browser.assert.containsText('.jumbotron', 'Mozilla');
    });
  },

  after: browser => browser.end()
};
