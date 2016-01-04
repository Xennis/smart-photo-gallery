function MainController($scope, $state, ApiFactory, $http) {
	// Get global config of the app (used to pass values from PHP)
	if (spgAppConfig) {
		$scope.appConfig = spgAppConfig;
	} else {
		console.warn('No global configuration spgAppConfig');
	}

	// Messages
	$scope.adminNoticeClass = '';
	$scope.adminNoticeText = '';
	// Type: 'updated', 'error'
	$scope.adminNotice = function(type, text) {
		$scope.adminNoticeClass = type;
		$scope.adminNoticeText = text;
	};
	
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
		},
		{
			state: 'photographers',
			label: 'Photographers'
		}
	];
	$scope.navbarTabsCurrent = $state.current.name;
	
	//
	$scope.showStates = function(state) {
		// addPhotos
		if (state === $scope.navbarTabs[1].state && $scope.path === '') {
//			return false;
		}
		// addGallery
		else if (state === $scope.navbarTabs[2].state && $scope.gallery.depth >= 3) {
			return false;
		}
		// editGallery
		else if (state === $scope.navbarTabs[3].state && $scope.path === '') {
			return false;
		}
		return true;
	};
	
	// Get routing params
	$scope.path = $state.params.path;
	// Request gallery data
	$scope.gallery = {
		id: undefined,
		depth: undefined
	};
	ApiFactory.getGallery($scope.path, function(gallery) {
		$scope.gallery = gallery;
	}, function() {
		console.warn('Request failed');
	});
};
	
MainController.$inject = ['$scope', '$state', 'ApiFactory', '$http'];

module.exports = MainController;