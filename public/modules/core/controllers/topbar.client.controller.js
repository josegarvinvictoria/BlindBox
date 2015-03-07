'use strict';


angular.module('core').controller('TopController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        console.log($scope.authentication);
	}
]);
