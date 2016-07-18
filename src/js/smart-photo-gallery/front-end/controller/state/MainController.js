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
	
	// Get routing params
	var sort = $state.params.sort;
	if (sort === 'sequence' || sort === 'sequence-desc') {
		$scope.sort = sort;
	} else {
		$scope.sort = 'sequence';
	}
	
	var num = $state.params.num;
	if (num === '5' || num === '10' || num === '15') {
		$scope.num = num;
	} else {
		$scope.num = 10;
	}
	
	var page = $state.params.page;
	if (isNaN(page)) {
		$scope.page = 1;
	} else {
		$scope.page = parseInt(page);
	}
	
	$scope.changeNum = function() {
		// TODO: Maybe improve this implementation
		$scope.page = 1;
		$scope.getPhotos();
	};

	$scope.getPhotos = function() {
		$state.transitionTo('main', {
			page: $scope.page,
			num: $scope.num,
			sort: $scope.sort
		}, {
			notify: false
		});

		ApiFactory.getPhotos({
			gallery: $scope.gallery.id,
			order: $scope.sort,
			limit: $scope.num,
			offset: ($scope.page - 1) * $scope.num	
		}, function(data, totalItems) {
			$scope.photos = data;
			$scope.totalItems = totalItems;
		}, function() {
			console.warn('Request failed');
		});		
	};
	
	$scope.photos = [];
	ApiFactory.getGallery($scope.path, function(gallery) {
		$scope.gallery = gallery;
		$scope.getPhotos();
	}, function() {
		console.warn('Request failed');
	});
	
	
	// Request galleries
//	$scope.galleries = [];
//	ApiFactory.getGalleries($scope.path, function(galleries) {
//		$scope.galleries = galleries;
//	}, function() {
//		console.warn('Request failed');
//	});
};
	
MainController.$inject = ['$scope', '$state', 'ApiFactory', '$http'];

module.exports = MainController;