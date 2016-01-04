/**
 * Configure the API of the Angular module. As API the module uses the
 * "restangular" module.
 * 
 * @param {Object} RestangularProvider From restangular
 */
function api(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://dev.miros-truckstop.de/smart-gallery/api/');	
};
	
api.$inject = ['RestangularProvider'];
	
module.exports = api;