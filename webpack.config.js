// webpack会自动找到这个文件
// 所有webpack的任务、用到的loader、plugins都要配置在这里
// 该文件要符合cjs模块化规范

// 引入node中一个内置的path模块，专门用于解决路径问题
var path = require('path')

// 使用cjs的模块化规范，暴露一个对象，该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: 'development', // 工作模式
  entry: './src/js/app.js', // 入口
  output: {
    path: path.resolve(__dirname, 'build'), // 输出文件的路径
    filename: 'app.js'
  }
}