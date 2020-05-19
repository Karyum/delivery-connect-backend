
require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-proposal-object-rest-spread',
    ['@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ]]

});

module.exports = require('./app');
