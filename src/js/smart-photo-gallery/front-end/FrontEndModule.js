require('../common/CommonModule');
require('angular-ui-bootstrap');

angular.module('smart-photo-gallery.front-end', ['smart-photo-gallery.common', 'ui.bootstrap'])
	
	// Config
	.config(require('./config/routing'))
	
	// Directives
	.directive('galleryItem', require('./directive/GalleryItem'))
	.directive('photoItem', require('./directive/PhotoItem'))	
;