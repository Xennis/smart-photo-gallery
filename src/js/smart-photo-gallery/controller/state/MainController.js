function MainController($scope, $state, Restangular, $http) {
	// Get global config of the app (used to pass values from PHP)
	if (window.spgAppConfig) {
		$scope.appConfig = window.spgAppConfig;
		window.spgAppConfig = undefined;
	} else {
		console.warn('No global configuration window.spgAppConfig');
	}

	
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
		if (state === $scope.navbarTabs[1].state && $scope.path === '') {
			return false;
		}		
		else if (state === $scope.navbarTabs[2].state && $scope.gallery.depth >= 3) {
			return false;
		}
		else if (state === $scope.navbarTabs[3].state && $scope.path === '') {
			return false;
		}
		return true;
	};

	//
	$scope.gallery = {
		id: undefined,
		depth: undefined
	};
	var requestGallery = function(path) {
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
	requestGallery($scope.path);
};
	
MainController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = MainController;