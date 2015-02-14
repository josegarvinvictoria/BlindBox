'use strict';

// Configuring the Articles module
angular.module('contrasenyes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Contrasenyes', 'contrasenyes', 'dropdown', '/contrasenyes(/create)?');
		Menus.addSubMenuItem('topbar', 'contrasenyes', 'Llista de contrasenyes', 'contrasenyes');
		Menus.addSubMenuItem('topbar', 'contrasenyes', 'Crear una nova contrasenya', 'contrasenyes/create');
	}
]);