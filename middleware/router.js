const path = require('path');
const fs = require('fs');
const controller = require('../controller/index.js');
const { PATH_VIEW } = require('../const');

const Router = require('koa-router');
const router = new Router();

module.exports = function() {
	const VIEW_ROUTER = {};

	const view_reader = view_path => {
		const paths = [];
		const readFile = _path => {
			fs.readdirSync(_path).forEach(fileName => {
				let filePath = path.join(_path, fileName);
				if (fs.lstatSync(filePath).isDirectory()) {
					readFile(filePath);
				}else if (fileName.endsWith('.html')) {
					const routePath = filePath.replace(view_path, '').replace('.html', '');
					
					paths.push(routePath);
				}else {
					console.log('\033[43;30m 自动文件路由失败 \033[40;33m ' + filePath + '\033[0m')
					return;
				}
			});
		}
		readFile(view_path);
		return paths;
	}

	const defaultAction = async (ctx, next) => {
		ctx.body = await ctx.render(PATH_VIEW + '/' + ctx.path);
	}

	let paths = view_reader(PATH_VIEW);
	paths.forEach(e => {
		const action = controller[e] ? controller[e].action : defaultAction;
		router.get(e, action);
		console.log('\033[42;30m 自动路由成功 \033[40;37m ' + e + '  \033[0m')
	});
	return router;
}