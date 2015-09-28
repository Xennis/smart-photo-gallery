function GalleriesController($scope, $state, Restangular, $http) {
	
	// Function to request and store galleries
	$scope.galleries = [];
	$scope.requestGalleries = function(path) {
		Restangular.all('galleries').getList({
			path: path
		}).then(function(galleries) {
			$scope.galleries = galleries;
		}, function() {
			console.warn('Request failed');
		});
	};

	// Get routing params (TODO: double with main)
	$scope.path = $state.params.path;
	// Request galleries
	$scope.requestGalleries($scope.path);
};
	
GalleriesController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = GalleriesController;