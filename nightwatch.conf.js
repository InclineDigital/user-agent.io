const jar = require('selenium-server-standalone-jar');

module.exports = {
  src_folders: ['tests/e2e'],
  output_folder: 'tests/reports',
  // "custom_commands_path" : "",
  // "custom_assertions_path" : "",
  // "page_objects_path" : "",
  // "globals_path" : "",

  selenium: {
    start_process: true,
    server_path: jar.path,
    log_path: '',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': '',
      'webdriver.gecko.driver': 'node_modules/geckodriver/geckodriver',
      'webdriver.edge.driver': ''
    }
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost:3000',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: ''
      },
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },

    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge'
      }
    }
  }
};
