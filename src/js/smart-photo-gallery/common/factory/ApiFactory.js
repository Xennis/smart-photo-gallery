function ApiFactory(Restangular) {
		
	return {
		getGallery: function(path, success, failure) {
			Restangular.one('galleries', 'x').get({
				path: path
			}).then(function (response) {
				success(response.data);
			}, function () {
				failure();
			});
		},
		
		getGalleries: function(path, success, failure) {
			Restangular.all('galleries').getList({
				path: path
			}).then(function(response) {
				success(response.data);
			}, function() {
				failure();
			});			
		},
		
		getPhotos: function(params, success, failure) {
			Restangular.all('photos').getList(params).then(function(response) {
				success(response.data, response.headers('x-total-count'));
			}, function() {
				failure();
			});
		},
		
		getPhotographers: function(success, failure) {
			Restangular.all('photographers').getList().then(function(response) {
				success(response.data);
			}, function() {
				failure();
			});
		}
    };
};

ApiFactory.$inject = ['Restangular'];
	
module.exports = ApiFactory;