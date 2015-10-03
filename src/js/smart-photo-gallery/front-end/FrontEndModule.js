require('../common/CommonModule');

angular.module('smart-photo-gallery.front-end', ['smart-photo-gallery.common'])
	
	// Config
	.config(require('./config/routing'))
	
	// Directives
	.directive('galleryItem', require('./directive/GalleryItem'))
	.directive('photoItem', require('./directive/PhotoItem'))	
;