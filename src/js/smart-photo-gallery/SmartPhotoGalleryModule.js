require('angular-ui-router');
require('lodash');
require('restangular');

angular.module('smart-photo-gallery', ['ui.router', 'restangular'])
	
	// Config
	.config(require('./config/api'))
	.config(require('./config/routing'))
	
	// Directives
	.directive('galleryItem', require('./directive/GalleryItem'))
	.directive('photoItem', require('./directive/PhotoItem'))

;
