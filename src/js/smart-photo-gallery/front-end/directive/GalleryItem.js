function GalleryItem() {
    return {
        restrict: 'E',
        template: require('../view/directive/GalleryItem.html'),
		scope: {
			item: '='
		}
    };
};
	
module.exports = GalleryItem;