const http = require('http');

http.request('http://www.unicode.org/Public/UNIDATA/EmojiSources.txt', response =>{
  response.pipe(process.stdout);
  /*
  var body = '';  
  response.on('data' chunk => body += chunk);
  response.on('end', () => console.log(body);
  */
}).end();


