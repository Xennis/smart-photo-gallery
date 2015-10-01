/*global require, module, __dirname */
module.exports = {
	serve: {
		port: 4000
	},
	scripts: {
		src: [
			'src/js/bower_components/dropzone/dist/min/dropzone.min.js'
		],
		dest: 'dist/',
		name: 'smart-photo-gallery.js'
	},	
	styles: {
		src: 'src/less/smart-photo-gallery.less',
		dest: 'dist/'
	},
	watch: {
		styles: 'src/less/**/*.less',
		webpack: ['src/js/smart-photo-gallery/**/*.js', 'src/js/smart-photo-gallery/**/*.html']
	},
	webpack: {
		src: '../../webpack.config.js'
	}
};