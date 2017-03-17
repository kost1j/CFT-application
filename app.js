var BrowserSync = require('browser-sync');
BrowserSync({
		server: "app",
		files: ["app/*.html", "app/css/*.css", "app/js/*.js", "app/api/*.json"]
});