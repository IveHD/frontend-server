const path = require('path');
const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const autoRouter = require('./middleware/autoRouter')();
const render = require('koa-swig');
const co = require('co');
const { PATH_STATIC } = require('./const');

app.context.render = co.wrap(render({
	root: path.join(__dirname, 'view')
}));
app.use(async (ctx, next) => {
	let s1 = Date.now();
	await next();
	let s2 = Date.now();
	console.log(ctx.path, `${s2-s1}ms`);
});
app.use(autoRouter.routes()).use(autoRouter.allowedMethods());

if(process.env.API_MOCK) {
	console.log('\033[43;30;7m mock数据启动 \033[40;37m 数据接口请求将被转发到本地data.json文件中 \033[0m');
	app.use(require('./mock/index'));
}

app.use(koaStatic(PATH_STATIC));
app.listen(8000);