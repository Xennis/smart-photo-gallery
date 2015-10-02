function PhotoItem() {
    return {
        restrict: 'E',
        template: require('../view/directive/PhotoItem.html'),
		scope: {
			filepath: '@',
			item: '=',
			sequence: '='
		},
		link: function($scope, element, attrs) {			
			$scope.$watch('sequence', function() {
				$scope.item.sequence = $scope.sequence;	
			});
		}
    };
};
	
module.exports = PhotoItem;