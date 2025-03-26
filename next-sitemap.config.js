const config = {
    siteUrl: 'http://localhost:8000/',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', disallow: '/user/' },
        { userAgent: '*', allow: '/' },
      ],
    },
  };
  
  module.exports = config;