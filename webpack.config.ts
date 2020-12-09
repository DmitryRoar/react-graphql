import { Configuration } from "webpack"

const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

interface IBabelOptions { 
  presets: string[]
  plugins: string[]
}

const plugins = () => {
  const base = [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public', 'favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      minify: {
        collapseWhitespace: !isDev
      }
    })
  ]

  return base
}

const babelOptions = (preset?: string) => {
  const opts: IBabelOptions = {
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
  const loaders: any = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index'],
  output: {
    filename: isDev ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '@img': path.resolve(__dirname, 'public', 'assets', 'img')
    }
  },
  devServer: {
    port: 3000, 
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
          options: babelOptions(...['@babel/preset-react', '@babel/preset-typescript'])
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
} as Configuration