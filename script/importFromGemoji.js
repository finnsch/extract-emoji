const https = require('https');
const fs = require('fs');

function download(callback) {
  https.get('https://raw.githubusercontent.com/s0meone/gemoji/master/db/emoji.json', response => {
    var body = '';

    response.on('data', function(chunk){
      body += chunk;
    });

    response.on('end', function(){
      var json = JSON.parse(body);
      callback(json);
    });
  }).on('error', function(e){
    console.log("Got an error: ", e);
  });
}

function parse(data) {
  var string =
      '\'use strict\';\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      'exports.default = \'';

  for (var idx in data) {
    var item = data[idx];

    if (typeof item.aliases === "undefined" || typeof item.emoji === "undefined" || item.emoji == null) {
      continue;
    }

    var iosVersion = parseFloat(item["ios_version"]);
    var maxIosVersion = 9.1;

    if (iosVersion > maxIosVersion) {
      continue;
    }

    string += (idx == 0 ? '' : ' ') + item.emoji;
  }

  string = string + '\';';

  fs.writeFile('../src/list.js', string);
}

download(parse);