const cp = require('child_process');

const app = cp.spawn('npm', ['start'], { stdio: 'inherit' });
const test = cp.spawn('nightwatch', [], { stdio: 'inherit' });

test.on('exit', code => {
  app.kill();
  app.on('exit', () => {
    process.exit(code);
  });
});
