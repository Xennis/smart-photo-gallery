function AddPhotosController($scope, $state, Restangular, $http) {
	var Dropzone = require('../../../../../../../node_modules/dropzone/dist/min/dropzone.min');
	Dropzone.autoDiscover = false;
	
	var dropzone = new Dropzone('#dropzone', {
		url: Restangular.configuration.baseUrl+'/photos/?path='+$scope.path,
		maxFilesize: $scope.appConfig.maximum_upload_file_size,
		acceptedFiles: 'image/*'
	});
};

AddPhotosController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = AddPhotosController;