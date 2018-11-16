const fs = require('fs');
const path = require('path');

const controllerReader = _path => {
	const obj = {};
	const readFile = (_path) => {
		fs.readdirSync(_path).forEach(fileName => {
			let filePath = path.join(_path, fileName);
			if (fs.lstatSync(filePath).isDirectory()) {
				readFile(filePath);
			} else {
				const controller = require(filePath);
				Object.keys(controller).forEach(url => {
					if (!!obj[url]) {
						throw `${url} has already existed...`;
					} else {
						obj[url] = controller[url];
					}
				});
			}
		});	
	}
	readFile(_path);
	return obj;
};

module.exports = controllerReader(__dirname);