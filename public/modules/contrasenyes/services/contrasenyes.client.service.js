'use strict';

//Contrasenyes service used to communicate Contrasenyes REST endpoints
angular.module('contrasenyes').factory('Contrasenyes', ['$resource',
	function($resource) {
		return $resource('contrasenyes/:contrasenyeId', { contrasenyeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);