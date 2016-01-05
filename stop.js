'use strict';

var url = require('url');
var fs = require('fs');
var stop = require('stop');

var server = require('./server.js');


stop.getWebsiteStream('http://localhost:3000', {
  filter: function (currentURL) {
    return url.parse(currentURL).hostname === 'localhost';
  },
  parallel: 1
})
//.syphon(stop.addFavicon())
.syphon(stop.minifyJS())
.syphon(stop.minifyCSS({deadCode: true, silent: true}))
.syphon(stop.log())
.syphon(stop.checkStatusCodes([200]))
.syphon(stop.writeFileSystem(__dirname + '/out'))
.wait().done(function () {
  server.close();
  console.log('success');
});