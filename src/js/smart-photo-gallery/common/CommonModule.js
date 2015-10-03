require('angular-ui-router');
require('lodash');
require('restangular');
require('ngInfiniteScroll');

angular.module('smart-photo-gallery.common', ['ui.router', 'restangular', 'infinite-scroll'])
	
	// Config
	.config(require('./config/api'))
	
	// Factory
	.factory('ApiFactory', require('./factory/ApiFactory'))
		
;