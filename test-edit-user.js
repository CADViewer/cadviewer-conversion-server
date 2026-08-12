const http = require('http');

async function test() {
  const data = JSON.stringify({
    id: 1, // replace with actual user id
    email: 'casper.harnung@tailormade.com',
    password: 'new_test_password',
    first_name: 'Casper',
    last_name: 'Harnung',
    username: 'charnung',
    role: 'admin',
    is_enabled: 1
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/users', // the endpoint in settings.js
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    res.on('data', d => {
      process.stdout.write(d);
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

test();
