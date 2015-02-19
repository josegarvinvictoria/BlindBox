'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Contrasenye = mongoose.model('Contrasenye'),
	_ = require('lodash');

/**
 * Create a Contrasenye
 */
exports.create = function(req, res) {
	var contrasenye = new Contrasenye(req.body);
	contrasenye.user = req.user;

	contrasenye.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contrasenye);
		}
	});
};

/**
 * Show the current Contrasenye
 */
exports.read = function(req, res) {
	res.jsonp(req.contrasenye);
};

/**
 * Update a Contrasenye
 */
exports.update = function(req, res) {
	var contrasenye = req.contrasenye ;

	contrasenye = _.extend(contrasenye , req.body);

	contrasenye.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contrasenye);
		}
	});
};

/**
 * Delete an Contrasenye
 */
exports.delete = function(req, res) {
	var contrasenye = req.contrasenye ;

	contrasenye.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contrasenye);
		}
	});
};

/**
 * List of Contrasenyes
 */
exports.list = function(req, res) { 
    var currentUser = req.session.passport.user;



	Contrasenye.find({user : currentUser}).sort('-created').populate('user', 'displayName').exec(function(err, contrasenyes) {

		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contrasenyes);
		}
	});
};

/**
 * Contrasenye middleware
 */
exports.contrasenyeByID = function(req, res, next, id) { 
	Contrasenye.findById(id).populate('user', 'displayName').exec(function(err, contrasenye) {
		if (err) return next(err);
		if (! contrasenye) return next(new Error('Failed to load Contrasenye ' + id));
		req.contrasenye = contrasenye ;
		next();
	});
};

/**
 * Contrasenye authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.contrasenye.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
