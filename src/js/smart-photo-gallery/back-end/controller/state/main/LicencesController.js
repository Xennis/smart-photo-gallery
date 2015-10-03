function LicencesController($scope, $state, Restangular, ApiFactory) {

	$scope.submit = function(licences, item) {
		// TODO: one message overwrites the other
		Restangular.all('licences').customPUT(licences).then(function(data) {
			if (data) {
				$scope.adminNotice('updated', 'Saved changes');					
			} else {
				$scope.adminNotice('error', 'Failed to save changes ' + data);					
			}
		}, function(data) {
			// TODO: move above code here
		});
		
		if (item.name.length > 0) {
			Restangular.all('licences').post(item).then(function() {
				$state.go($state.current, {}, {reload: true});
				$scope.adminNotice('updated', 'Saved changes');	
			}, function() {
				$scope.adminNotice('error', 'Failed to save changes');
			});
		}
	};
	
	$scope.newLicence = {};
	
	$scope.licences = [];
	ApiFactory.getLicences(function(list) {
		$scope.licences = list;
	}, function() {
		console.warn('Request failed');
	});	
};

LicencesController.$inject = ['$scope', '$state', 'Restangular', 'ApiFactory'];

module.exports = LicencesController;