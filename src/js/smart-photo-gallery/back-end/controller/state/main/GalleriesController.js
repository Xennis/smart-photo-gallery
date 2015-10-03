function GalleriesController($scope, $state, Restangular, ApiFactory) {
	
	// Options to sort photos
	$scope.sortableOptions = {
		items: "> .photo-item",
		cursor: 'move',
		containment: 'parent',
		placeholder: 'placeholder'
	};
	
	$scope.postPhotos = function(photos) {
		if ($scope.gallery.id) {
			Restangular.all('photos').customPUT(photos).then(function(data) {
				console.log(data);
				if (data) {
					$scope.adminNotice('updated', 'Saved changes');					
				} else {
					$scope.adminNotice('error', 'Failed to save changes ' + data);					
				}
			}, function(data) {
				// TODO: move above code here
			});
		} else {
			console.warn('postPhotos: no gallery id')
		}
	};
	
	$scope.photosLimit = 8;
	// Endless scroll
	$scope.onPageBottom = function() {
		$scope.photosLimit += 8;
	};

	// Get routing params (TODO: double with main)
	$scope.path = $state.params.path;
	// Request galleries
	$scope.galleries = [];
	ApiFactory.getGalleries($scope.path, function(galleries) {
		$scope.galleries = galleries;
	}, function() {
		console.warn('Request failed');
	});
	
	// Gallery data is request via REST API in MainController. Hence wait for
	// this data since we need the ID.
	$scope.photos = [];
	$scope.$watch('gallery', function() {
		if ($scope.gallery.id) {
			ApiFactory.getPhotos($scope.gallery.id, function(data) {
				$scope.photos = data;
			}, function() {
				console.warn('Request failed');
			});
		};
	});
	
	$scope.photographers = [];
	ApiFactory.getPhotographers(function(data) {
		$scope.photographers = data;
	}, function() {
		console.warn('Request failed');
	});	
	
	$scope.licences = [];
	ApiFactory.getLicences(function(data) {
		$scope.licences = data;
	}, function() {
		console.warn('Request failed');
	});	
};
	
GalleriesController.$inject = ['$scope', '$state', 'Restangular', 'ApiFactory'];

module.exports = GalleriesController;