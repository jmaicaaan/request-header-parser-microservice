'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function whoamiHandler(req, res) {
  var headers = req.headers;
  if (!headers) {
    return res.status(500).send('No header found in the request');
  }
  if (!headers['user-agent'] || !headers['accept-language']) {
    return res.status(500).send('Headers have no user-agent or accept-language');
  }
  var software = headers['user-agent'].split(' (').join('*').split(') ').join('*').split('*')[1];
  console.log('software', software);
  var language = headers['accept-language'].split(',')[0];
  var parsedHeader = {
    ip: headers.host,
    software: software,
    language: language
  };
  res.send(parsedHeader);
}

exports.whoamiHandler = whoamiHandler;