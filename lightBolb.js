(function ($) {

	$.fn.lightBolb = function(options) {

		var defaultVal = {
			background : '#ffffff',
			opacity : 0.5
		};

		var params = $.extend(defaultVal, options);

		var publicMethodes = {};

		return this.children().each ( function() {
			$(this.firstElementChild).click(function(){
				alert('marko');
				return false;
			});
		});
	}

})(jQuery);