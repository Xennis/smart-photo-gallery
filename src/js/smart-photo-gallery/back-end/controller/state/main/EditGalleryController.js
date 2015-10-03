function EditGalleryController($scope, $state, Restangular, $http) {
	$scope.postGallery = function(item) {
		
		console.log(item);
		item.save().then(function() {
			$state.go('galleries', {
				path: $scope.path,
				reload: true
			});
		}, function() {
			console.warn('Save failed');
		});
	};
};
	
EditGalleryController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = EditGalleryController;