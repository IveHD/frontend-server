const glob = require('glob');
const { PATH_VIEW, PATH_CONTROLLER } = require('../const');
const Router = require('koa-router');
const router = new Router();

const actionMap = {};
let files = glob.sync(PATH_CONTROLLER + '/**/*.js');
files.forEach(filePath => {
	let ctrl = require(filePath);
	for(let p in ctrl) {
		if(!actionMap[p]) {
			actionMap[p] = ctrl[p];
			console.log('\033[42;30m ⚠️ 自定义路由成功 \033[40;37m ' + p + '  \033[0m')
			router.get(p, async (ctx, next) => {
				await ctrl[p].action(ctx, next);
				ctx.body = await ctx.render(PATH_VIEW + '/' + ctx.path);
			});
		}else {
			throw `路径冲突：${p}`;
		}
	}
});

const defaultAction = async (ctx, next) => {
	ctx.body = await ctx.render(PATH_VIEW + '/' + ctx.path);
}

module.exports = () => {
	let files = glob.sync(PATH_VIEW + '/**/*.html');
	files.forEach(filePath => {
		let url = filePath.replace(PATH_VIEW, '').replace('.html', '');
		if(!actionMap[url]) {
			console.log('\033[42;30m 自动路由成功 \033[40;37m ' + url + '  \033[0m')
			router.get(url, defaultAction);
		}
	});
	return router;
}