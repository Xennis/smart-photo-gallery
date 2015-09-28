
/**
 * Configure the routing of the Angular module. For routing the module uses
 * the "ui.router" module.
 * 
 * @param {Object} $stateProvider From module ui.router
 * @param {Object} $urlRouterProvider From module ui.router
 */
function routing($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
	// Default route
	$urlRouterProvider.otherwise('/galleries/');

	/*
	 * https://github.com/angular-ui/ui-router/issues/1119
	 * http://jsfiddle.net/jylinman/rm1Lbptf/1/
	 * 
	 */
	function valToString(val) {
		return val !== null ? val.toString() : val;
	}
	$urlMatcherFactoryProvider.type('nonURIEncoded', {
		encode: valToString,
		decode: valToString,
		is: function () { return true; }
	});
	/* (end) */

	// Set up the state
	$stateProvider
	.state('main', {
		template: require('../view/state/main.html'),
		controller: require('../controller/state/MainController')
	})
	.state('galleries', {
		parent: 'main',
		url: '/galleries/{path:nonURIEncoded}',
		template: require('../view/state/main/galleries.html'),
		controller: require('../controller/state/main/GalleriesController')		
	})
	.state('addPhotos', {
		parent: 'main',
		url: '/addPhotos/{path:nonURIEncoded}',
		template: require('../view/state/main/addPhotos.html'),
		controller: require('../controller/state/main/AddPhotosController')	
	})	
	.state('addGallery', {
		parent: 'main',
		url: '/addGallery/{path:nonURIEncoded}',
		template: require('../view/state/main/addGallery.html'),
		controller: require('../controller/state/main/AddGalleryController')	
	})
	;		
}

routing.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];

module.exports = routing;