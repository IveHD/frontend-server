const fs = require('fs');
const path = require('path');
module.exports = async (ctx, next) => {
	let requestPath = ctx.path;
	let json = fs.readFileSync(path.resolve(__dirname, './data.json'), 'utf-8');
	let mockData = {};
	try {
		mockData = JSON.parse(json);
	}catch (err) {
		mockData = {};
	}
	console.log(requestPath);
	if(mockData[requestPath]) {
		console.log('\033[42;30m mock success \033[40;37m ' + requestPath + ' \033[0m');
		ctx.body = mockData[requestPath];
	}else {
		console.log('\033[43;30m mock 404，已转发到测试环境: \033[40;33m ' + requestPath + '\033[0m')
		await next();
	}
}