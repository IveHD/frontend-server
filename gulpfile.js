const path = require('path');
const glob = require('glob');
const gulp = require('gulp');
const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const resolve = require('rollup-plugin-node-resolve');
const resolve_cjs = require('rollup-plugin-commonjs');
const resolve_json = require('rollup-plugin-json');
const progress = require('rollup-plugin-progress');
const alias = require('rollup-plugin-alias');

const CONST = require('./const');

gulp.task('js', function() {
	let runRollup = entry => {
		const file = path.join('dist/', entry.replace(CONST.PATH_ASSET, ''));
		const name = file.split('/').slice(-1).join().replace('.js', '');
		rollup.rollup({
			input: entry,
			plugins: [
				resolve_cjs(),
				resolve(),
				resolve_json(),
				babel(),
				progress({clearLine: false}),
				alias({
					'@view': CONST.PATH_VIEW,
					'@asset': CONST.PATH_VIEW,
					'@js': CONST.PATH_ASSET_JS,
					'@common': CONST.PATH_ASSET_JS_COMMON
				})
			],
			external: ['react', 'react-dom']
		}).then(function (bundle) {
			bundle.write({
				file: file,
				format: "umd",
				name: name
			});
		});
	}
	let r = glob(CONST.PATH_ASSET + '/**/*.js', function(err, files) {
		if(err) throw err;
		files.forEach(p => {
			runRollup(p);
		});
	});
	return r;
});

gulp.task('watch:js', function() {
	gulp.watch([CONST.PATH_ASSET + '/**/*.js'], ['js']);
});

gulp.task('dev', ['watch:js'], function(){
	return;
});