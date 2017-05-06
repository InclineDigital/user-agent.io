const cp = require('child_process');

const app = cp.spawn('npm', ['start'], { stdio: 'inherit' });
const test = cp.spawn('nightwatch', [], { stdio: 'inherit' });

const handleErr = err => {
  console.error(err);
  app.kill();
  test.kill();
  process.exit(1);
};

app.on('error', handleErr);
test.on('error', handleErr);

test.on('exit', code => {
  app.kill();
  app.on('exit', () => {
    process.exit(code);
  });
});
