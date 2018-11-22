const sa = require('superagent');

module.exports = {
	'/index': {
		method: 'Get',
		action: async (ctx, next) => {
			let code = 'asdad';
			await sa.get('http://127.0.0.1:8000/api/msg').then(e => {
				code = e.body.result.name;
			})
			ctx.state = {aa: code};
			next();
		}
	}
}