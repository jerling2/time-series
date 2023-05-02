/* 
   NodeJS Web Server!
*/

// Express Dependency
const express = require('express');
const app = express();

// Require the route modules
const home = require('./routes/home');
const auth = require('./routes/auth');
const file = require('./routes/file');
const sse = require('./routes/sse');
const browse = require('./routes/browse');

/* -------------------------------------------------------------------------- */
/*                       HTTPS Protocol for web traffic                       */
/* -------------------------------------------------------------------------- */
// Require NodeJS to be an HTTPS server.
const https = require("https");

// Whitelist the Web App's url.
const cors = require('cors');

app.use(cors({
  origin: 'https://pages.uoregon.edu'
}));

// Requiring file system to use local files
const fs = require("fs");
const bodyParser = require("body-parser");

// Configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Necessary HTTPS Key and Certificate 
const options = {
  key: fs.readFileSync("/var/www/html/server.key"),
  cert: fs.readFileSync("/var/www/html/server.cert"),
};

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
// Register the routes with Express
app.use('/', home);
app.use('/auth', auth);
app.use('/file', file);
app.use('/sse', sse);
app.use('/browse', browse);

// Listen on port 3000 (default).
const port = process.env.APP_PORT || 3000;
const server = https.createServer(options, app);

server.listen(port, function (req, res) {
  console.log(`Server started on ${port}`);
});
