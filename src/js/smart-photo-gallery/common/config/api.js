/**
 * Configure the API of the Angular module. As API the module uses the
 * "restangular" module.
 * 
 * @param {Object} RestangularProvider From restangular
 */
function api(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://dev.miros-truckstop.de/smart-gallery/api/');
	RestangularProvider.setFullResponse(true);
	
	RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
		if (operation === 'put' && what === 'photos') {
			// TODO: improve (maybe use a whiteliste)
			for (var i=0; i<element.length; i++) { 
				delete element[i]['photographer_id'];
				delete element[i]['photographer_name'];
			}
			return { 
				element: element
			};
		}
	});
};
	
api.$inject = ['RestangularProvider'];
	
module.exports = api;