const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/cgi-bin',
    createProxyMiddleware({
      target: 'https://api.weixin.qq.com',
      changeOrigin: true,
    })
  );

  app.use(
    '/cgi-bin2',
    createProxyMiddleware({
      target: 'https://api.weixin2.qq.com',
      changeOrigin: true,
    })
  );
};