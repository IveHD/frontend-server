const path = require('path');
const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const router = require('./middleware/router')();
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
app.use(router.routes()).use(router.allowedMethods());

app.use(koaStatic(PATH_STATIC, {
	// maxage: 60 * 1000,
	setHeaders: function(res) {
		console.log(res);
		res.setHeader('Cache-Control', 'no-store');
	}
}));
app.listen(8000);