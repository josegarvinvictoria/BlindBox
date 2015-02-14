'use strict';

//Setting up route
angular.module('contrasenyes').config(['$stateProvider',
	function($stateProvider) {
		// Contrasenyes state routing
		$stateProvider.
		state('listContrasenyes', {
			url: '/contrasenyes',
			templateUrl: 'modules/contrasenyes/views/list-contrasenyes.client.view.html'
		}).
		state('createContrasenye', {
			url: '/contrasenyes/create',
			templateUrl: 'modules/contrasenyes/views/create-contrasenye.client.view.html'
		}).
		state('viewContrasenye', {
			url: '/contrasenyes/:contrasenyeId',
			templateUrl: 'modules/contrasenyes/views/view-contrasenye.client.view.html'
		}).
		state('editContrasenye', {
			url: '/contrasenyes/:contrasenyeId/edit',
			templateUrl: 'modules/contrasenyes/views/edit-contrasenye.client.view.html'
		});
	}
]);