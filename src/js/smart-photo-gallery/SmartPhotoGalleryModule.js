require('angular-ui-router');
require('lodash');
require('restangular');
require('../bower_components/angular-ui-sortable/sortable.min.js');

angular.module('smart-photo-gallery', ['ui.router', 'restangular', 'ui.sortable'])
	
	// Config
	.config(require('./config/api'))
	.config(require('./config/routing'))
		
	// Directives
	.directive('galleryItem', require('./directive/GalleryItem'))
	.directive('photoItem', require('./directive/PhotoItem'))

;
