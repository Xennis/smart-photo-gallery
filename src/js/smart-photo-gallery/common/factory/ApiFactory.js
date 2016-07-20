function ApiFactory(Restangular) {

	var galleriesEndpoint = 'galleries';
	var photosEndpoint = 'photos';
	var photographersEndpoint = 'photographers';

	return {
		getGallery: function(path, success, failure) {
			Restangular.one(galleriesEndpoint, 'x').get({
				path: path
			}).then(function (response) {
				success(response.data);
			}, function () {
				failure();
			});
		},
		
		getGalleries: function(path, success, failure) {
			Restangular.all(galleriesEndpoint).getList({
				path: path
			}).then(function(response) {
				success(response.data);
			}, function() {
				failure();
			});			
		},
		
		deleteGallery: function(id, success, failure) {
			Restangular.one(galleriesEndpoint, id).remove().then(function() {
				success();
			}, function() {
				failure();
			});
		},

		getPhotos: function(params, success, failure) {
			Restangular.all(photosEndpoint).getList(params).then(function(response) {
				success(response.data, response.headers('x-total-count'));
			}, function() {
				failure();
			});
		},
		
		getPhotographers: function(success, failure) {
			Restangular.all(photographersEndpoint).getList().then(function(response) {
				success(response.data);
			}, function() {
				failure();
			});
		}
    };
};

ApiFactory.$inject = ['Restangular'];
	
module.exports = ApiFactory;