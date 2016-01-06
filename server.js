'use strict';

var fs = require('fs');
var express = require('express');
var escape = require('escape-html');

var app = express();

var PRISM_URL = 'http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+json+yaml';

app.get('/', function (req, res, next) {
  var src = fs.readFileSync(__dirname + '/index.html', 'utf8');
  src = src.replace(/\<file +path\=\"([^\"]+)\" *\/?\>/g, function (_, file) {
    return escape(fs.readFileSync(__dirname + '/' + file, 'utf8'));
  });
  res.send(src);
});

app.get('/js/prism.js', function (req, res, next) {
  res.sendFile(__dirname + '/prism/prism.js');
});
app.get('/css/style.css', function (req, res, next) {
  res.type('css');
  var css = (
    fs.readFileSync(
      require.resolve('bootstrap/dist/css/bootstrap.css'),
      'utf8'
    ) +
    fs.readFileSync(
      __dirname + '/prism/prism.css',
      'utf8'
    ) + '.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string { background: none; }'
  );
  res.send(css);
});
app.get('/fonts/:filename', function (req, res, next) {
  res.sendFile(require.resolve('bootstrap/dist/fonts/' + req.params.filename));
});
app.get('/images/:filename', function (req, res, next) {
  res.sendFile(__dirname + '/images/' + req.params.filename);
});

module.exports = app.listen(3000);
