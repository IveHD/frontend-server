(function() {
	self.addEventListener('install', function() {
		console.log('sw install...');
	});
	self.addEventListener('activate', function() {
		console.log('sw activate...');
	});
	self.addEventListener('fetch', function() {
		console.log('sw fetch...');
	});
})();