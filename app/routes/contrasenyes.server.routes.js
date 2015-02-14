'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var contrasenyes = require('../../app/controllers/contrasenyes.server.controller');

	// Contrasenyes Routes
	app.route('/contrasenyes')
		.get(contrasenyes.list)
		.post(users.requiresLogin, contrasenyes.create);

	app.route('/contrasenyes/:contrasenyeId')
		.get(contrasenyes.read)
		.put(users.requiresLogin, contrasenyes.hasAuthorization, contrasenyes.update)
		.delete(users.requiresLogin, contrasenyes.hasAuthorization, contrasenyes.delete);

	// Finish by binding the Contrasenye middleware
	app.param('contrasenyeId', contrasenyes.contrasenyeByID);
};
