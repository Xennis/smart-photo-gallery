function PhotoItem() {
    return {
        restrict: 'E',
        template: require('../view/directive/PhotoItem.html'),
		scope: {
			filepath: '@',
			item: '=',
			sequence: '='
		}
    };
};
	
module.exports = PhotoItem;