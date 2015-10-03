require('../common/CommonModule');
require('../../bower_components/angular-ui-sortable/sortable.min.js');

angular.module('smart-photo-gallery.back-end', ['smart-photo-gallery.common', 'ui.sortable'])
	
	// Config
	.config(require('./config/routing'))
		
	// Directives
	.directive('galleryItem', require('./directive/GalleryItem'))
	.directive('photoItem', require('./directive/PhotoItem'))
	.directive('submitButton', require('./directive/SubmitButton'))	

;
