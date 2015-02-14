'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Contrasenye = mongoose.model('Contrasenye'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, contrasenye;

/**
 * Contrasenye routes tests
 */
describe('Contrasenye CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Contrasenye
		user.save(function() {
			contrasenye = {
				name: 'Contrasenye Name'
			};

			done();
		});
	});

	it('should be able to save Contrasenye instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contrasenye
				agent.post('/contrasenyes')
					.send(contrasenye)
					.expect(200)
					.end(function(contrasenyeSaveErr, contrasenyeSaveRes) {
						// Handle Contrasenye save error
						if (contrasenyeSaveErr) done(contrasenyeSaveErr);

						// Get a list of Contrasenyes
						agent.get('/contrasenyes')
							.end(function(contrasenyesGetErr, contrasenyesGetRes) {
								// Handle Contrasenye save error
								if (contrasenyesGetErr) done(contrasenyesGetErr);

								// Get Contrasenyes list
								var contrasenyes = contrasenyesGetRes.body;

								// Set assertions
								(contrasenyes[0].user._id).should.equal(userId);
								(contrasenyes[0].name).should.match('Contrasenye Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Contrasenye instance if not logged in', function(done) {
		agent.post('/contrasenyes')
			.send(contrasenye)
			.expect(401)
			.end(function(contrasenyeSaveErr, contrasenyeSaveRes) {
				// Call the assertion callback
				done(contrasenyeSaveErr);
			});
	});

	it('should not be able to save Contrasenye instance if no name is provided', function(done) {
		// Invalidate name field
		contrasenye.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contrasenye
				agent.post('/contrasenyes')
					.send(contrasenye)
					.expect(400)
					.end(function(contrasenyeSaveErr, contrasenyeSaveRes) {
						// Set message assertion
						(contrasenyeSaveRes.body.message).should.match('Please fill Contrasenye name');
						
						// Handle Contrasenye save error
						done(contrasenyeSaveErr);
					});
			});
	});

	it('should be able to update Contrasenye instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contrasenye
				agent.post('/contrasenyes')
					.send(contrasenye)
					.expect(200)
					.end(function(contrasenyeSaveErr, contrasenyeSaveRes) {
						// Handle Contrasenye save error
						if (contrasenyeSaveErr) done(contrasenyeSaveErr);

						// Update Contrasenye name
						contrasenye.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Contrasenye
						agent.put('/contrasenyes/' + contrasenyeSaveRes.body._id)
							.send(contrasenye)
							.expect(200)
							.end(function(contrasenyeUpdateErr, contrasenyeUpdateRes) {
								// Handle Contrasenye update error
								if (contrasenyeUpdateErr) done(contrasenyeUpdateErr);

								// Set assertions
								(contrasenyeUpdateRes.body._id).should.equal(contrasenyeSaveRes.body._id);
								(contrasenyeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Contrasenyes if not signed in', function(done) {
		// Create new Contrasenye model instance
		var contrasenyeObj = new Contrasenye(contrasenye);

		// Save the Contrasenye
		contrasenyeObj.save(function() {
			// Request Contrasenyes
			request(app).get('/contrasenyes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Contrasenye if not signed in', function(done) {
		// Create new Contrasenye model instance
		var contrasenyeObj = new Contrasenye(contrasenye);

		// Save the Contrasenye
		contrasenyeObj.save(function() {
			request(app).get('/contrasenyes/' + contrasenyeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', contrasenye.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Contrasenye instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contrasenye
				agent.post('/contrasenyes')
					.send(contrasenye)
					.expect(200)
					.end(function(contrasenyeSaveErr, contrasenyeSaveRes) {
						// Handle Contrasenye save error
						if (contrasenyeSaveErr) done(contrasenyeSaveErr);

						// Delete existing Contrasenye
						agent.delete('/contrasenyes/' + contrasenyeSaveRes.body._id)
							.send(contrasenye)
							.expect(200)
							.end(function(contrasenyeDeleteErr, contrasenyeDeleteRes) {
								// Handle Contrasenye error error
								if (contrasenyeDeleteErr) done(contrasenyeDeleteErr);

								// Set assertions
								(contrasenyeDeleteRes.body._id).should.equal(contrasenyeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Contrasenye instance if not signed in', function(done) {
		// Set Contrasenye user 
		contrasenye.user = user;

		// Create new Contrasenye model instance
		var contrasenyeObj = new Contrasenye(contrasenye);

		// Save the Contrasenye
		contrasenyeObj.save(function() {
			// Try deleting Contrasenye
			request(app).delete('/contrasenyes/' + contrasenyeObj._id)
			.expect(401)
			.end(function(contrasenyeDeleteErr, contrasenyeDeleteRes) {
				// Set message assertion
				(contrasenyeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Contrasenye error error
				done(contrasenyeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Contrasenye.remove().exec();
		done();
	});
});