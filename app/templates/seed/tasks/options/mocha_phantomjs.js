var grunt = require('grunt');

var url = 'http://' +
          grunt.config('settings.hostname') +
          ':' + grunt.config('settings.mochaPhantomPort') +
          '/test/index.html';

module.exports = {
  all: {
    options: {
      urls: [url]
    }
  }
};