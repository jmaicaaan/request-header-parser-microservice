function whoamiHandler(req, res) {
  let headers = req.headers;
  if (!headers) {
    return res
      .status(500)
      .send('No header found in the request');
  }
  if ((!headers['user-agent']) || !headers['accept-language']) {
    return res
      .status(500)
      .send('Headers have no user-agent or accept-language');
  }
  let software = headers['user-agent']
    .split(' (').join('*')
    .split(') ').join('*')
    .split('*')[1];
  let language = headers['accept-language'].split(',')[0];
  let parsedHeader = {
    ip: headers.host,
    software,
    language
  };
  res.send(parsedHeader);
}

export { whoamiHandler } 