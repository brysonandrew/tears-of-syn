/** General Configurations Like PORT, HOST names and etc... */

var config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  karmaPort: 9876,

  // This part goes to React-Helmet for Head of our HTML
  app: {
    head: {
      title: 'Code Bro | Freelance Web Developer',
      titleTemplate: 'code-bro: %s',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Building websites in React, Typescript, THREE.js and Node.js.' },
      ]
    }
  }
};

module.exports = config;
