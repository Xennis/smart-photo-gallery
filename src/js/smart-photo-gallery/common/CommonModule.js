require('angular-ui-router');
require('lodash');
require('restangular');
require('ng-infinite-scroll');

angular.module('smart-photo-gallery.common', ['ui.router', 'restangular', 'infinite-scroll'])
	
	// Config
	.config(require('./config/api'))
	
	// Factory
	.factory('ApiFactory', require('./factory/ApiFactory'))
		
;