module.exports = {
  beforeEach: browser => {
    browser.url('http://localhost:3000').waitForElementVisible('div[data-reactroot]', 1000);
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

  'Smoke test': browser => {
    browser.assert.title("What's My User Agent? 🖥 📱 💻 📟").assert.visible('nav', 'nav rendered').assert.visible('main', 'main rendered');
  },

  after: browser => browser.end()
};
