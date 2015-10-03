function PhotographersController($scope, $state, Restangular, ApiFactory) {
	
	$scope.submit = function() {
		// TODO: one message overwrites the other
		postPhotographers($scope.photographers);
		postPhotographer($scope.newPhotographer);
	};
	
	var postPhotographers = function(photographers) {
		Restangular.all('photographers').customPUT(photographers).then(function(data) {
			if (data) {
				$scope.adminNotice('updated', 'Saved changes');					
			} else {
				$scope.adminNotice('error', 'Failed to save changes ' + data);					
			}
		}, function(data) {
			// TODO: move above code here
		});
	};
	
	var postPhotographer = function(item) {
		if (item.name.length > 0) {
			Restangular.all('photographers').post(item).then(function() {
				$state.go($state.current, {}, {reload: true});
				$scope.adminNotice('updated', 'Saved changes');	
			}, function() {
				$scope.adminNotice('error', 'Failed to save changes');
			});
		}
	}
	
	
	$scope.newPhotographer = {};
	
	$scope.photographers = [];
	ApiFactory.getPhotographers(function(list) {
		$scope.photographers = list;
	}, function() {
		console.warn('Request failed');
	});	
	
};

PhotographersController.$inject = ['$scope', '$state', 'Restangular', 'ApiFactory'];

module.exports = PhotographersController;