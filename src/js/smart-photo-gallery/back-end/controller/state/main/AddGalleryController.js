function AddGalleryController($scope, $state, Restangular, $http) {
	$scope.item;

	// Get routing params
	//$scope.path = $state.params.path;

	$scope.generateSlug = function(name) {
		if (name) {
			$scope.item.file = angular.lowercase(name).replace(/[^a-z0-9_-]/g, "");
		}
	};

	$scope.postGallery = function(item) {
		if ($scope.path) {
			item.file = $scope.path+'/'+item.file;			
		}
		Restangular.all('galleries').post(item).then(function() {
			$state.go('galleries', {
				path: $scope.path,
				reload: true
			});
		}, function() {
			console.warn('There was an error saving');
		});
	};
};
	
AddGalleryController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = AddGalleryController;