// ; Put in case that some other function is not closed prooprley
;(function ($) {

	// Constructor
	$.fn.lightBolb = function(options) {
		// Default values
		var defaultVal = {
			background   : '#D4D4CA',
			opacity      : 0.5,
			holderHeight : "400px",
			holderWidth  : "400px"
		};

		// jQuery methods for combinig defaults and passed values
		var params = $.extend(defaultVal, options);

		// Holder for images
		var el  =  {
			holder : 'lightBolobHolder'
		}

		// Public method applied for plug in... Got to make it private
		// Don't want to get messed up with other JS or jQ
		var publicMethodes = {
			checkImgSize : function (orWidth, orHeight, width, height) {
				if ( (orWidth===width) || (orHeight===height) ) {
					return false;
				}
			},
			appendIt : function(e) {
				$("#"+el.holder).html(e);
				$("#"+el.holder).css({ left : "30%" });
			},
			//Main initil
			init : function() {
				// Append container for images position it abslute and keep it hidden
				$("body").append("<div id='"+el.holder+"'></div>");
				//Get values for css
				// TODO Make it resizable, add max height max width
				$("#"+el.holder).css({ 'width'      : params.holderWidth, 
									   'height'     : params.holderHeight, 
								   	   'background' : params.background,
								   	   'position'   : 'absolute', 
								   	   'top'        : '30%', 
								   	   'left' 	    : '-2000%',
								       'z-index'    : 100000
				});
			}
		};
		publicMethodes.init();

		// Binding methods for each elment
		return this.children().each ( function() {

			$(this.firstElementChild).live("click", function(){
				var img = "<img src='"+$(this).context.src+"'/>";;
				publicMethodes.appendIt(img);
				 return false;
			});

		});

	}

})(jQuery);