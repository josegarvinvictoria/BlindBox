'use strict';

(function() {
	// Contrasenyes Controller Spec
	describe('Contrasenyes Controller Tests', function() {
		// Initialize global variables
		var ContrasenyesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Contrasenyes controller.
			ContrasenyesController = $controller('ContrasenyesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Contrasenye object fetched from XHR', inject(function(Contrasenyes) {
			// Create sample Contrasenye using the Contrasenyes service
			var sampleContrasenye = new Contrasenyes({
				name: 'New Contrasenye'
			});

			// Create a sample Contrasenyes array that includes the new Contrasenye
			var sampleContrasenyes = [sampleContrasenye];

			// Set GET response
			$httpBackend.expectGET('contrasenyes').respond(sampleContrasenyes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contrasenyes).toEqualData(sampleContrasenyes);
		}));

		it('$scope.findOne() should create an array with one Contrasenye object fetched from XHR using a contrasenyeId URL parameter', inject(function(Contrasenyes) {
			// Define a sample Contrasenye object
			var sampleContrasenye = new Contrasenyes({
				name: 'New Contrasenye'
			});

			// Set the URL parameter
			$stateParams.contrasenyeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/contrasenyes\/([0-9a-fA-F]{24})$/).respond(sampleContrasenye);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contrasenye).toEqualData(sampleContrasenye);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Contrasenyes) {
			// Create a sample Contrasenye object
			var sampleContrasenyePostData = new Contrasenyes({
				name: 'New Contrasenye'
			});

			// Create a sample Contrasenye response
			var sampleContrasenyeResponse = new Contrasenyes({
				_id: '525cf20451979dea2c000001',
				name: 'New Contrasenye'
			});

			// Fixture mock form input values
			scope.name = 'New Contrasenye';

			// Set POST response
			$httpBackend.expectPOST('contrasenyes', sampleContrasenyePostData).respond(sampleContrasenyeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Contrasenye was created
			expect($location.path()).toBe('/contrasenyes/' + sampleContrasenyeResponse._id);
		}));

		it('$scope.update() should update a valid Contrasenye', inject(function(Contrasenyes) {
			// Define a sample Contrasenye put data
			var sampleContrasenyePutData = new Contrasenyes({
				_id: '525cf20451979dea2c000001',
				name: 'New Contrasenye'
			});

			// Mock Contrasenye in scope
			scope.contrasenye = sampleContrasenyePutData;

			// Set PUT response
			$httpBackend.expectPUT(/contrasenyes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/contrasenyes/' + sampleContrasenyePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid contrasenyeId and remove the Contrasenye from the scope', inject(function(Contrasenyes) {
			// Create new Contrasenye object
			var sampleContrasenye = new Contrasenyes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Contrasenyes array and include the Contrasenye
			scope.contrasenyes = [sampleContrasenye];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/contrasenyes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleContrasenye);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.contrasenyes.length).toBe(0);
		}));
	});
}());