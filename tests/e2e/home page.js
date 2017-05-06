module.exports = {
  beforeEach: browser => {
    browser.url('http://localhost:3000');
    browser.waitForElementVisible('div[data-reactroot]', 1000);
  },

  // 'Demo test Google' : function (browser) {
  //   browser
  //     .url('http://www.google.com')
  //     .waitForElementVisible('body', 1000)
  //     .setValue('input[type=text]', 'nightwatch')
  //     .waitForElementVisible('button[name=btnG]', 1000)
  //     .click('button[name=btnG]')
  //     .pause(1000)
  //     .assert.containsText('body', 'Night Watch')
  //     .end();
  // },

  'page loads': browser => {
    browser.assert.title("What's My User Agent? 🖥 📱 💻 📟");
    browser.assert.visible('nav');
    browser.assert.visible('main');
  },

  'page contains UA component': browser => {
    browser.assert.visible('.jumbotron');
    // todo: figure out how to fake the UA
    browser.assert.containsText('.jumbotron', 'Mozilla');
  },

  after: browser => browser.end()
};
