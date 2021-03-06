/**
 * app.js 是webpack的入口，所有的外部文件（js\json\css\less等等）都需要在这里引入使用
 */
import { sub, sum } from './module1'
import { data, message } from './module2'
import school from './module3'
import json from '../json/test.json'
import '../css/demo.css'
import '../css/demo.less'
import '../css/iconfont.css'

// 包含ES6的高级语法的转换
import '@babel/polyfill'

sum(1, 2)
sub(3, 4)
console.log(data)
console.log(message)
console.log(school)
console.log(json)

const a = () => { console.log('bcd') }
const { address } = school

// 测试js语法转换
const obj = { d: () => { console.log(1213) } }
const { d } = obj
d()

// 兼容性处理测试
const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve(900)
  }, 1000)
})

p.then(
  value => { console.log('成功', value) },
  reason => { console.log('失败', reason) }
)
