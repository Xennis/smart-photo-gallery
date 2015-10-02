function AddPhotosController($scope, $state, Restangular, $http) {
	var Dropzone = require('../../../../bower_components/dropzone/dist/min/dropzone.min');
	Dropzone.autoDiscover = false;
	
	var dropzone = new Dropzone('#dropzone', {
		//maxFilesize: 2, // MB
		url: 'http://xennis.de/smart-gallery/api/photos/?path='+$scope.path
	});
};
	
AddPhotosController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = AddPhotosController;