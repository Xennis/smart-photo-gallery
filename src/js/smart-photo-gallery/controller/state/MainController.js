function MainController($scope, $state, Restangular, $http) {
	// Navbar tabs
	$scope.navbarTabs = [
		{
			state: 'galleries',
			label: 'Home'
		},
		{
			state: 'addPhotos',
			label: 'Add photos'
		},
		{
			state: 'addGallery',
			label: 'Add gallery'
		},
		{
			state: 'editGallery',
			label: 'Edit gallery'
		}
	];
	$scope.navbarTabsCurrent = $state.current.name;
	
	//
	$scope.showStates = function(state) {
		if (state === $scope.navbarTabs[3].state && $scope.path == '') {
			return false;
		}
		else if (state === $scope.navbarTabs[2].state && $scope.gallery.depth >= 3) {
			return false;
		}
		return true;
	};

	//
	$scope.gallery;	
	$scope.requestGallery = function(path) {
		Restangular.one('galleries', 'x').get({
			path: path
		}).then(function (gallery) {
			$scope.gallery = gallery;
		}, function() {
			console.warn('Request failed');
		});
	};
	
	// Get routing params
	$scope.path = $state.params.path;
	// Request gallery data
	$scope.requestGallery($scope.path);
};
	
MainController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = MainController;