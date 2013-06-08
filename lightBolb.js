(function ($) {

	$.fn.lightBolb = function(options) {

		var defaultVal = {
			background : '#ffffff',
			opacity : 0.5
		};

		var params = $.extend(defaultVal, options);

		var publicMethodes = {
			changeCss : function(){
				$(this).css("width",1000);
			},
			checkImgSize : function (orWidth, orHeight, width, height) {
				
				if((orWidth===width)||(orHeight===height)) {

					console.log('vec namesteno');
					return false;
				}
			}
		};

		return this.children().each ( function() {
			$(this.firstElementChild).click(function(){
				var width = $(this).width();
				var height = $(this).height();
				var originalWidth = this.naturalWidth;
				var originalHeight = this.naturalHeight;
				publicMethodes.checkImgSize(originalWidth, originalHeight, width, height);
				$(this).css({"width":originalWidth, "height":originalHeight});
				 return false;
			});
		});
	}

})(jQuery);