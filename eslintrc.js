module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true,
      "node": true
    },
    "rules": {

      "no-semi/no-semi": require('./eslint-rules/no-semi')
    }
  };
  