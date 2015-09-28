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
		}
	];
	$scope.navbarTabsCurrent = $state.current.name;
	
	// Get routing params
	$scope.path = $state.params.path;
};
	
MainController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = MainController;