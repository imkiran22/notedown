console.log('Running ' + process.env.NODE_ENV + ' scripts');
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
          test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
          loader: "file-loader",
          options: {
            name: '[path][name].[ext]',
            //outputPath: '',
            emitFile: true
          }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.json$/,
        loader: "file-loader",
        options: {
           name: '[path][name].[ext]',
           emitFile: true
        }
      }
    ]
  },
  output: {
    path: path.resolve('dist'),
    filename: "client.min.js"
  },
  plugins: debug ? [new HtmlWebpackPlugin({template: 'index.html', filename: 'index.html'}), new ExtractTextPlugin('[name].css'), new CopyWebpackPlugin([
            { from: 'json' }])] : [
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new HtmlWebpackPlugin({hash: true, cache: false, template: 'index.html', filename: 'index.html', minify: {minifyJS: true, minifyCSS: true, removeComments: true, collapseWhitespace: true}}),
    new ExtractTextPlugin('[name].min.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
    new CopyWebpackPlugin([
            { from: 'json' }
    ])
  ],
};
