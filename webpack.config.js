var path              = require('path'),
    webpack           = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  // set the context (optional)
  context: path.join( __dirname, '/src'),

  entry: {
    app:      'index.js',
    vendors: ['angular']
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[chunkhash].js'),

    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html',
      minify: {
        maxLineLength: 120,
        collapseWhitespace: true
      }
    }),

    new ExtractTextPlugin('[hash].[name].css', {
        allChunks: true
    })
  ],

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: path.join( __dirname, '/src')
  },

  module: {
    loaders: [

      // load and compile javascript
      { test: /\.js$/,   exclude: /node_modules/, loader:"babel", query: { presets: ['es2015', 'stage-1'] } },

      // load css and process less
      { test: /\.less$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("style", "css!less") },
      { test: /\.css$/,  exclude: /node_modules/, loader: ExtractTextPlugin.extract("style", "css") },

      // load JSON files and HTML
      { test: /\.json$/, loader: "json" },
      { test: /\.html$/, exclude: /node_modules/, loader:"raw" },

      // load fonts(inline base64 URLs for <=8k)
      { test: /\.(ttf|eot|svg|otf)$/, loader: "file" },
      { test: /\.woff(2)?$/, loader: "url?limit=8192&minetype=application/font-woff"},

      // load images (inline base64 URLs for <=8k images)
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  // webpack dev server configuration
  devServer: {
    contentBase: "./src",
    noInfo: false,
    hot: false,
    inline: false,
    progress: true,
    stats: {
      colors: true
    }
  },

  // support source maps
  devtool: "#source-map"
};