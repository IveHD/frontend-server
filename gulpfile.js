const gulp = require('gulp');
const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const path = require('path');
const glob = require('glob');
const { PATH_ASSET } = require('./const');

let runRollup = entry => {
	const file = path.join('dist/', entry.replace(PATH_ASSET, ''));
	const name = file.split('/').slice(-1).join().replace('.js', '');
	console.log(file, name)
	rollup.rollup({
		input: entry,
		plugins: [ babel() ],
		external: ['react', 'react-dom']
	}).then(function (bundle) {
		bundle.write({
			file: file,
			format: "umd",
			name: name
		});
	});
}

glob(PATH_ASSET + '/**/*.js', function(err, files) {
	if(err) throw err;
	files.forEach(p => {
		runRollup(p);
	});
});