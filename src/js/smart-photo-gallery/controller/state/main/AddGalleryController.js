/**
 * Controller of the state "home".
 * 
 * @param {angular.$scope} $scope
 * @param {angular.$state} $state
 */
function AddGalleryController($scope, $state, Restangular, $http) {
	// Get routing params
	//$scope.path = $state.params.path;

};
	
AddGalleryController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = AddGalleryController;