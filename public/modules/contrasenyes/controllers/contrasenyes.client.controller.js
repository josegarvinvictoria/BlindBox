'use strict';

// Contrasenyes controller
angular.module('contrasenyes').controller('ContrasenyesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contrasenyes',
	function($scope, $stateParams, $location, Authentication, Contrasenyes) {
		$scope.authentication = Authentication;

        //Crear una contrasenya guardar-la a la base de dades
        //i que es mostri directament a a la finestra
        $scope.contrasenyes = [

        ];

        $scope.showPass = function(e){
            e.stopPropagation();
            e.preventDefault();
            console.log('1123')
        };
		// Create new Contrasenye
		$scope.create = function() {
			// Create new Contrasenye object
            if($scope.nomservei == null){
                console.log("Esta buit");
            }else{
                $scope.contrasenyes.unshift ({
				nomservei: $scope.nomservei,
                url: $scope.url,
                nomusuari: $scope.nomusuari,
                contrasenya: $scope.contrasenya,
                observacions: $scope.observacions
			});



            var prova = new Contrasenyes ({
                nomservei: this.nomservei,
                url: this.url,
                nomusuari: this.nomusuari,
                contrasenya: this.contrasenya,
                observacions: this.observacions
            });



			// Redirect after save
			prova.$save(function(response) {
				$location.path('contrasenyes/create');

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				//$scope.error = errorResponse.data.message;
			});
		};
        }
		// Remove existing Contrasenye
		$scope.remove = function(contrasenye) {
			if ( contrasenye ) { 
				contrasenye.$remove();

				for (var i in $scope.contrasenyes) {
					if ($scope.contrasenyes [i] === contrasenye) {
						$scope.contrasenyes.splice(i, 1);
					}
				}
			} else {
				$scope.contrasenye.$remove(function() {
					$location.path('contrasenyes');
				});
			}
		};

		// Update existing Contrasenye
		$scope.update = function() {
			var contrasenye = $scope.contrasenye;

			contrasenye.$update(function() {
				$location.path('contrasenyes/' + contrasenye._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contrasenyes
		$scope.find = function() {
			$scope.contrasenyes = Contrasenyes.query();
		};

		// Find existing Contrasenye
		$scope.findOne = function() {
			$scope.contrasenye = Contrasenyes.get({ 
				contrasenyeId: $stateParams.contrasenyeId
			});
		};
	}
]);
