(function($) {

	$('#complexify #password').complexify({}, function (valid, complexity) {
		var progressBar = $('#complexify #complexity-bar');

		progressBar.toggleClass('progress-bar-success', valid);
		progressBar.toggleClass('progress-bar-danger', !valid);
		progressBar.css({'width': complexity + '%'});

		$('#complexify #complexity').text(Math.round(complexity) + '%');
	});

})(jQuery);
