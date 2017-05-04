module.exports = {
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "plugins": [
    "prettier",
    "react"
  ],
  "extends": [
    "eslint:recommended",
    "google",
    "plugin:react/recommended",
    "prettier",
  ],
  "rules": {
    "prettier/prettier": ["error", {"singleQuote": true, "printWidth": 160}],
    "prefer-const": "error",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "no-console": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
 }
};
