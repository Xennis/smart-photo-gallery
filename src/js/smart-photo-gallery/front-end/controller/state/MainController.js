function MainController($scope, $state, ApiFactory, $http) {
	// Get global config of the app (used to pass values from PHP)
	if (spgAppConfig) {
		$scope.appConfig = spgAppConfig;
	} else {
		console.warn('No global configuration spgAppConfig');
	}
	
	// Get routing params 
	//$scope.path = $state.params.path;
	$scope.path = $scope.appConfig.path;
	
	// Request gallery data
	$scope.gallery = {
		id: undefined,
		depth: undefined
	};
	$scope.photos = [];
	ApiFactory.getGallery($scope.path, function(gallery) {
		$scope.gallery = gallery;
		
		ApiFactory.getPhotos($scope.gallery.id, function(data) {
			$scope.photos = data;
		}, function() {
			console.warn('Request failed');
		});
		
	}, function() {
		console.warn('Request failed');
	});
	
	// Request galleries
	$scope.galleries = [];
	ApiFactory.getGalleries($scope.path, function(galleries) {
		$scope.galleries = galleries;
	}, function() {
		console.warn('Request failed');
	});
};
	
MainController.$inject = ['$scope', '$state', 'ApiFactory', '$http'];

module.exports = MainController;