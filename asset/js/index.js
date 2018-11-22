import { sum } from './common/index';

fetch('/api/msg').then(r => r.json()).then(r => {
	document.getElementById('fetch').innerText = '我是页面请求的数据'
	console.log(r);
}).catch(e => {
	throw e;
});
console.log(sum(1, 2));