/* eslint-env node, es6 */

const path = require('path');
const pkg = require('../package.json');

module.exports = function(karma) {
  karma.set({
    browserDisconnectTolerance: 2,
    frameworks: ['mocha'],
    client: {
      runInParent: true,
      mocha: {
        timeout: 2500
      }
    },
    files: [
        {
          pattern: path.resolve(__dirname, './index_test.js'),
          watched: false
        }, {
          pattern: '**/*',
          included: false,
          watched: false
        }
  ],
    preprocessors: {
      '**/*.js': ['webpack'],
      
    },
    
    reporters: ['progress'],
    webpack: {
      //devtool: 'inline-source-map',
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'buble-loader'
            }
          }
        ]
      }
    }
  });
};
