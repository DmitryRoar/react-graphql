const {resolve} = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const plugins = () => {
  const base = [
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, 'public', 'favicon.ico'),
          to: resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public', 'index.html'),
      minify: {
        collapseWhitespace: !isDev
      }
    })
  ]

  return base
}

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index'],
  output: {
    filename: isDev ? '[name].js' : '[name].[hash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '@img': resolve(__dirname, 'public', 'assets', 'img')
    }
  },
  devServer: {
    port: 3000, // какого-то хуя девсервер не работает в webpack v5
    historyApiFallback: true
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader'
        }, 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webmp)/i,
        use: 'file-loader'
      },
      {
        test: /\.(ttf|wott|wott2|eot)/i,
        use: 'file-loader'
      },
      {
        test: /\.ts$/i,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-typescript')
          }
        ]
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.tsx/i,
        use: [{
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react', '@babel/preset-typescript')
        }, 'ts-loader']
      },
      {
        test: /\.jsx/i,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        },
        exclude: /node_modules/
      }
    ]
  }
}