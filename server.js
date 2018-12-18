var express = require('express');
var routesEngine = require('./index.js'); 
var app = express();
routesEngine(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port, process.cwd(): ' + process.cwd() );
});
In implementation of index.js, now we need to implement verification process:
var request = require('request');
var jsSHA = require('jssha');

module.exports = function (app) {
  app.route('/').get(function(req,res){
    var token="anil"; // replace it with your own token
    var signature = req.query.signature,
      timestamp = req.query.timestamp,
      echostr   = req.query.echostr,
      nonce     = req.query.nonce;
      oriArray = new Array();
      oriArray[0] = nonce;
      oriArray[1] = timestamp;
      oriArray[2] = token;
      oriArray.sort();
      var original = oriArray.join('');

      var shaObj = new jsSHA("SHA-1", 'TEXT');
      shaObj.update(original);
      var scyptoString = shaObj.getHash('HEX');
      console.log("calculated string: " + scyptoString);
     if (signature == scyptoString) {
        res.send(echostr);
     } else {
        res.send('bad token');
     }
  });
};
