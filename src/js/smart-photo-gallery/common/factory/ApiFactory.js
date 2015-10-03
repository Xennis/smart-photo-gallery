function ApiFactory(Restangular) {
		
	return {
		getGallery: function(path, success, failure) {
			Restangular.one('galleries', 'x').get({
				path: path
			}).then(function (data) {
				success(data);
			}, function () {
				failure();
			});
		},
		
		getGalleries: function(path, success, failure) {
			Restangular.all('galleries').getList({
				path: path
			}).then(function(data) {
				success(data);
			}, function() {
				failure();
			});			
		},
		
		getPhotos: function(galleryId, success, failure) {
			Restangular.all('photos').getList({
				gallery: galleryId
			}).then(function(data) {
				success(data);
			}, function() {
				failure();
			});
		}
    };
};

ApiFactory.$inject = ['Restangular'];
	
module.exports = ApiFactory;