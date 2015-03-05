'use strict';

angular.module('core').directive('progressBar', [
	function() {
		return {
			templateUrl: 'modules/core/views/progress.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Progress bar directive logic
				// ...
                jQuery('#complexify #password').complexify({}, function(valid, complexity) {
                    var progressBar = $('#complexify #complexity-bar');
                    progressBar.toggleClass('progress-bar-success', valid);
                    progressBar.toggleClass('progress-bar-danger', !valid);
                    progressBar.css({
                        'width': complexity + '%'
                    });

                    $('#complexify #complexity').text(Math.round(complexity) + '%');
                });

			}
		};
	}
]);
