function EditGalleryController($scope, $state, Restangular, $http) {
	$scope.postGallery = function(item) {
		/* item.save does not work here, since item also has a parent/depth/etc.
		 * attribute */
		Restangular.one('galleries', item.id).customPUT({
			name: item.name,
			description: item.description,
			file: item.file
		}).then(function() {
			$state.go('galleries', {
				path: $scope.path,
				reload: true
			});
			$scope.adminNotice('updated', 'Saved changes');
		}, function() {
			$scope.adminNotice('error', 'Failed to saved changes');
			console.warn('Save failed');
		});
	};
};
	
EditGalleryController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = EditGalleryController;