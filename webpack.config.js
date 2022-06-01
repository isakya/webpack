// webpack会自动找到这个文件
// 所有webpack的任务、用到的loader、plugins都要配置在这里
// 该文件要符合cjs模块化规范

// 引入node中一个内置的path模块，专门用于解决路径问题
var path = require('path')

// 基本css-loader的配置
const baseCssLoader = ['style-loader', 'css-loader']

// 使用cjs的模块化规范，暴露一个对象，该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: 'development', // 工作模式
  // entry: { peiqi: './src/js/app.js' }, // 入口
  entry: './src/js/app.js', // 入口
  output: {
    path: path.resolve(__dirname, 'build/js'), // 输出文件的路径
    filename: 'app.js'
  },
  // module.rules 中配置的一个个的loader
  module: {
    rules: [
      // 1、配置解析css loader
      { // rules 下一个对象就是 一个loader
        test: /\.css$/, // 匹配规则 匹配所有以.css结尾的文件
        use: [ // 后指定的loader先执行
          'style-loader', // 创建style标签，将样式资源插入进，添加到head中生效
          'css-loader' // 将css 文件变成commonjs模块加载到js中，里面内容是样式字符串

          // 完整版写法 可以对loader做出更详细的配置
          // {loader: style-loader}
          // {loader: css-loader}
        ]
      },
      // 2、配置解析less loader
      {
        test: /\.less$/,
        use: [
          ...baseCssLoader,
          'less-loader'
        ]
      }
    ]
  }
}