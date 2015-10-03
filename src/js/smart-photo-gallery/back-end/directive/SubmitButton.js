function SubmitButton() {
    return {
        restrict: 'E',
        template: '<p class="submit">'
			+'<input type="submit" value="Save changes" class="button button-primary">'			
		+'</p>'
    };
};
	
module.exports = SubmitButton;