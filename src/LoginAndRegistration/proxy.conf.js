var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [{
  context: '/',
  target: 'http://10.168.92.56:5000',
  secure: false,
  changeOrigin:true
}];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);
    proxyConfig.forEach(function(entry) {
      entry.agent = agent;
    });
  }
  else{
    console.log('Using corporate proxy server is not found--');
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);