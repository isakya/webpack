/**
 * app.js 是webpack的入口，所有的外部文件（js\json\css\less等等）都需要在这里引入使用
 */
import { sub, sum } from './module1';
import { data, message } from './module2';
import school from './module3';
import json from '../json/test.json';
import '../css/demo.css';
import '../css/demo.less';
import '../css/iconfont.css';

sum(1, 2);
sub(3, 4);
console.log(data);
console.log(message);
console.log(school);
console.log(json);

const a = () => { console.log('bcd'); };
const { address } = school;
