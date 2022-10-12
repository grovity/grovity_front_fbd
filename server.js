const favicon = require('express-favicon');
const compression = require('compression');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const csp = require(`helmet-csp`);

const port = process.env.PORT || 3000;
const app = express();

app.use(csp({
  directives: {
    defaultSrc: [
      `'self'`,
      `'unsafe-inline'`,
      "grovity.co",
      "grovity.co:*",
      "*.grovity.co",
      "*.grovity.co:*",
      "fonts.googleapis.com",
      "static.mailerlite.com",
      "*.inspectlet.com",
      "web-chat.global.assistant.watson.appdomain.cloud",
      "assistant-chat-us-south.watsonplatform.net",
      "www.google-analytics.com",
      "api.amplitude.com",
      "*.giphy.com",
      "giphy.com",
    ],
    scriptSrc: [
      `'self'`,
      `'unsafe-inline'`,
      "web-chat.global.assistant.watson.appdomain.cloud",
      'static.mailerlite.com',
      '*.googletagmanager.com',
      '*.google-analytics.com',
      'cdn.inspectlet.com',
      'snap.licdn.com',
      'hn.inspectlet.com',
      'api.amplitude.com',
      'stats.g.doubleclick.net',
      '*.inspectlet.com',
      "giphy.com",
    ],
    fontSrc: [
      `'self'`,
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      "giphy.com",
    ],
    imgSrc: [
      `'self'`,
      '*.s3.amazonaws.com',
      'data:',
      'blob:',
      '*.google-analytics.com',
      '*.grovity.co',
      '*.linkedin.com',
      '*.inspectlet.com',
      '*.google.com',
      "giphy.com",
    ]
  }
}));



app.use(helmet.frameguard());
app.use(helmet.dnsPrefetchControl()); // extra
app.use(helmet.expectCt()); // extra
app.use(helmet.hidePoweredBy()); // extra
app.use(helmet.hsts());
app.use(helmet.ieNoOpen()); // extra
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies()); // extra
app.use(helmet.referrerPolicy());
//app.use(helmet.xssFilter()); // extra

app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses if this request header is present
    return false;
  }

  // fallback to standard compression
  return compression.filter(req, res);
};

app.use(compression({
  // filter decides if the response should be compressed or not,
  // based on the `shouldCompress` function above
  filter: shouldCompress,
  // threshold is the byte threshold for the response body size
  // before compression is considered, the default is 1kb
  threshold: 0
}));

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
