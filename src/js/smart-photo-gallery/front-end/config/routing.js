
/**
 * Configure the routing of the Angular module. For routing the module uses
 * the "ui.router" module.
 * 
 * @param {Object} $stateProvider From module ui.router
 * @param {Object} $urlRouterProvider From module ui.router
 */
function routing($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
	// Default route
	$urlRouterProvider.otherwise('/');

	// Set up the state
	$stateProvider
	.state('main', {
		url: '/?:page&:num&:sort',
		template: require('../view/state/main.html'),
		controller: require('../controller/state/MainController')
	})
	;		
}

routing.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];

module.exports = routing;