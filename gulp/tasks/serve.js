/*global require, module, __dirname */
var config = require('../config').serve,
	browserSync = require('browser-sync'),
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('serve', ['styles', 'webpack'], function() {
	browserSync({
		port: config.port,
		server: {
			baseDir: config.baseDir,
			index: config.index
		},
		open: 'local'
	}, function (err, bs) {
	});
});