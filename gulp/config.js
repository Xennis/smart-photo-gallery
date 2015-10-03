/*global require, module, __dirname */
module.exports = {
	serve: {
		port: 4000,
		baseDir: ['dist', 'example'],
		index: 'back-end.html'
	},
	styles: {
		src: 'src/less/smart-photo-gallery.less',
		dest: 'dist/'
	},
	watch: {
		styles: 'src/less/**/*.less',
		webpack: ['src/js/smart-photo-gallery/**/*.js', 'src/js/smart-photo-gallery/**/*.html'],
		reload: 'dist/smart-photo-gallery.min.js'
	},
	webpack: {
		src: '../../webpack.config.js'
	}
};