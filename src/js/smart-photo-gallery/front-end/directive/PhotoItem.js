function PhotoItem() {
    return {
        restrict: 'E',
        template: require('../view/directive/PhotoItem.html'),
		scope: {
			filepath: '@',
			item: '='
		}
    };
};
	
module.exports = PhotoItem;