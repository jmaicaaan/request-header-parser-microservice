'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function whoamiHandler(req, res) {
  var headers = req.headers;
  var ip = void 0,
      software = void 0,
      language = void 0;
  if (!headers) {
    return res.status(500).send('No header found in the request');
  }
  try {
    ip = getIPAddress(req);
    software = getUserOS(req);
    language = getUserLanguage(req);
    var parsedHeader = {
      ip: ip,
      software: software,
      language: language
    };
    return res.send(parsedHeader);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

function getIPAddress(req) {
  if (!req) {
    throw 'No request object found';
  }
  var headers = req.headers;
  if (headers['x-forwarded-for']) {
    return headers['x-forwarded-for'].split(',').pop();
  } else {
    return req.connection.remoteAddress || req.socket.remoteAddress;
  }
}

function getUserLanguage(req) {
  if (!req) {
    throw 'No request object found';
  }
  var headers = req.headers;
  if (headers['accept-language']) {
    return headers['accept-language'].split(',')[0];
  } else {
    throw 'No accept-language found in the request header';
  }
}

function getUserOS(req) {
  if (!req) {
    throw 'No request object found';
  }
  var headers = req.headers;
  if (headers['user-agent']) {
    return headers['user-agent'].split(' (').join('*').split(') ').join('*').split('*')[1];
  } else {
    throw 'No user-agent found in the request header';
  }
}

exports.whoamiHandler = whoamiHandler;