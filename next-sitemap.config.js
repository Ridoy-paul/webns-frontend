const config = {
    siteUrl: 'http://toletbd.app',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', disallow: '/user/' },
        { userAgent: '*', allow: '/' },
      ],
    },
  };
  
  module.exports = config;