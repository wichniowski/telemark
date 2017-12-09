(   export PKG=eslint-config-airbnb;   npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add -D "$PKG@latest"; )
yarn add babel-eslint
echo "{
  \"parser\": \"babel-eslint\",
  \"env\": {                                                                          
    \"browser\": true,
    \"node\": true,
    \"jest\": true,
  },
  \"extends\": \"airbnb\",
  \"rules\": {
    \"react/jsx-filename-extension\": [1, { \"extensions\": [\".js\", \".jsx\"] }],
    \"import/prefer-default-export\": \"off\",
    \"no-bitwise\": \"off\",
    \"react/prop-types\": \"off\",
    \"react/prefer-stateless-function\": \"off\",
  }
}" > ./.eslintrc
