require('../common/CommonModule');
require('../../../../node_modules/angular-ui-sortable/dist/sortable.min.js');

angular.module('smart-photo-gallery.back-end', ['smart-photo-gallery.common', 'ui.sortable'])
	
	// Config
	.config(require('./config/routing'))
		
	// Directives
	.directive('galleryItem', require('./directive/GalleryItem'))
	.directive('photoItem', require('./directive/PhotoItem'))
	.directive('submitButton', require('./directive/SubmitButton'))	

;
