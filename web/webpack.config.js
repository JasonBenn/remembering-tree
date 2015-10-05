var webpack = require('webpack')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?optional[]=runtime&stage=0'
      }, {
        test: /\.scss/,
        loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions'
      }
    ]
  },

  entry: {
    app: ['webpack/hot/dev-server', './src/index.js']
  },

  output: {
    path: "./build",
    publicPath: "/assets/", // Files in build/ are exposed to index.html at assets/.
    filename: "bundle.js"
  },

  devServer: {
    // proxy: {
    //   '/api/*': 'http://localhost:3000/',
    //   headers: { "Access-Control-Allow-Origin": "*" }
    // },
    // historyApiFallback: true, // history fallthrough lets React Router handle routing
    noInfo: true, // makes webpack less verbose
    hot: true,
    inline: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  node: {
    fs: 'empty'
  },

  devtool: 'source-map'

};
