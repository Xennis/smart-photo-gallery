function GalleriesController($scope, $state, Restangular, $http) {

	// Function to request and store galleries
	$scope.galleries = [];
	var requestGalleries = function(path) {
		Restangular.all('galleries').getList({
			path: path
		}).then(function(data) {
			$scope.galleries = data;
		}, function() {
			console.warn('Request failed');
		});
	};
	
	// Function to request and store photos of a gallery
	$scope.photos = [];
	var requestPhotos = function(id) {
		Restangular.all('photos').getList({
			gallery: $scope.gallery.id
		}).then(function(data) {
			$scope.photos = data;
		}, function() {
			console.warn('Request failed');
		});
	};
	
	// Options to sort photos
	$scope.sortableOptions = {
		//'ui-floating': true,
		//cursor: 'move',
		//containment: 'parent',
		//item: '> .gallery-item',
//		stop: function(event, table) {
//			jQuery('.spg-photozone .order').each(function(index) {
//				jQuery(this).val(index);
//			});
//		}
	};
	
	$scope.photosLimit = 8;
	// Endless scroll
	$scope.onPageBottom = function() {
		$scope.photosLimit += 8;
	};

	// Get routing params (TODO: double with main)
	$scope.path = $state.params.path;
	// Request galleries
	requestGalleries($scope.path);
	
	// Gallery data is request via REST API in MainController. Hence wait for
	// this data since we need the ID.
	$scope.$watch('gallery', function() {
		if ($scope.gallery.id) {
			requestPhotos($scope.gallery.id);
		}
	});
};
	
GalleriesController.$inject = ['$scope', '$state', 'Restangular', '$http'];

module.exports = GalleriesController;