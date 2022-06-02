// webpack会自动找到这个文件
// 所有webpack的任务、用到的loader、plugins都要配置在这里
// 该文件要符合cjs模块化规范

// 引入node中一个内置的path模块，专门用于解决路径问题
const path = require('path')

// 引入插件 用于加工html文件 // 用之前不要style-loader 不然无法提取出css文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引入mini-css-extract-plugin，用于提取CSS为单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 引入压缩css插件
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// 基本css-loader的配置
const baseCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  'postcss-loader',
  // {
  //   loader: "postcss-loader",
  //   options: {
  //     postcssOptions: {
  //       plugins: [
  //         'postcss-preset-env'
  //       ],
  //     },
  //   },
  // }
]

// 使用cjs的模块化规范，暴露一个对象，该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: 'production', // 工作模式
  // entry: { peiqi: './src/js/app.js' }, // 入口
  entry: './src/js/app.js', // 入口
  output: {
    path: path.resolve(__dirname, '../build'), // 输出文件的路径
    filename: 'js/app.js', // 输出文件名字
    publicPath: '/build/',

  },
  // module.rules 中配置的一个个的loader
  module: {
    rules: [
      // 1、配置解析css loader
      { // rules 下一个对象就是 一个loader
        test: /\.css$/, // 匹配规则 匹配所有以.css结尾的文件
        use: [...baseCssLoader],
      },
      // 2、配置解析less loader
      {
        test: /\.less$/,
        use: [
          ...baseCssLoader,
          'less-loader',
        ],
      },
      // 3、配置解析样式中的图片，但该file-loader没对图片进行优化，只是复制改名而已，如果要优化就需要url-loader（需要下载）
      {
        test: /\.(png|jpg|gif|bmp)$/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
              outputPath: 'imgs', // 配置图片加工后存在的位置,不要加 /, 不然要配置publicPath
              // publicPath: '/build/imgs', // 配置图片引入时前缀路径
              name: '[hash:5].[ext]', // 处理图片名字长 用:数量
              limit: 8 * 1024, // 图片大小小于8KB时 将图片转为base64
            },
          },
        ],
      },
      // 其他资源打包 file-loader 是文件的搬运工
      {
        exclude: /\.(html|less|css|png|jpg|bmp|js|gif|json)$/, // 排除
        use: [
          {
            // loader: 'file-loader',
            loader: 'file-loader',
            options: {
              outputPath: 'media',
              name: '[hash:5].[ext]',
            },
          },
        ],
      },
      // 配置解析html中的图片
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      // js语法转换
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  // plugins中专门用于配置插件，插件必须经过实例化这一环节
  plugins: [
    // 实例化HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板的位置
    }),
    // 实例化MiniCssExtractPlugin
    new MiniCssExtractPlugin({
      filename: 'css/index.css', // 放到指定的文件夹下，并同时以index.css命名
    }),
    // default 启用所有的默认配置 
    // removeAll 移除所有的注释
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        presets: ['default', { discardComments: { removeAll: true } }]
      }
    })
  ]
}
