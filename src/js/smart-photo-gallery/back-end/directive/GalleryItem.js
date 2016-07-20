function GalleryItem() {
    return {
        restrict: 'E',
        template: require('../view/directive/GalleryItem.html'),
		scope: {
			item: '=',
			delete: '&'
		},
		link: function (scope, elem, attr) {
            scope.deleteGallery = function (id) {
                scope.delete({ id: id });
            };
        }
    };
};
	
module.exports = GalleryItem;