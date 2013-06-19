// TODO  * If image that has been clicked is already loaded do not call event
// TODO  * Check if image is valid and source can be accessed
// TODO  * Need to clear Q when clicking on new images(prevent abuse)
// TODO  * Add close button
// TODO  * Add close upon clicking anywhere else except the image, or image holder
// TODO  * Multiple images functionality


// ; Put in case that some other function is not closed properly
;(function ($) {

	// Constructor
	$.fn.lightBolb = function(options) {
		// Default values
		var defaultVal = {
			background   : '#D4D4CA',
			opacity      : 0.5,
			holderHeight : "1600px",
			holderWidth  : "1600px"
		};

		// jQuery methods for combinig defaults and passed values
		var params = $.extend(defaultVal, options);

		// Holder for images
		var el  =  {
			holder : 'lightBolobHolder',
            jQWrap : "#lightBolobHolder"
		}
		// Public method applied for plug in... Got to make it private
		// Don't want to get messed up with other JS or jQ
		var publicMethodes = {
			checkImgSize : function (orWidth, orHeight, width, height) {
				if ( (orWidth === width) || (orHeight === height) ) {
					return false;
				}
			},
			appendIt : function(e,w,h) {
                // Perform animation for lightBulb holder
                // Get current img values and values of wrapper for animate
                // Call .animate(), upon complete append image :-)

                $(el.jQWrap).html("<img id='loader' src='ajax-loader.gif'/>");
                var lightBulbWidth  = $(el.jQWrap).width();
                var lightBulbHeight = $(el.jQWrap).height();
                 $(el.jQWrap).animate({
                    width : w+60,
                    height: h+60
                    },100, function() {
                        $(el.jQWrap).html(e);
                    });
			},
			//Main init
			init : function() {
				// Append container for images position it abslute and keep it hidden
                // Check if container already exists, if true return false and do not append

                if ($(el.jQWrap).height() === null ){
                    $("body").append("<div id='"+el.holder+"'></div>");
                    //Get values for css
                    $("#"+el.holder).css({
                        'max-width'      : params.holderWidth,
                        'max-height'     : params.holderHeight,
                        'background'     : params.background,
                        'position'       : 'absolute',
                        'top'            : '150px',
                        'left' 	         : '150px',
                        'z-index'        : 100000
                    });
                }
                else {
                    console.log('Already exists');
                }
            }
		};


        publicMethodes.init();
		// Binding methods for each element
		return this.children().each ( function() {
			$(this.firstElementChild).live("click", function(){
                var img = "<img src='"+$(this).context.src+"'/>";
                var imgWidth   = $(this).context.naturalWidth;
                var imgHeight  = $(this).context.naturalHeight;

				publicMethodes.appendIt(img,imgWidth, imgHeight );
				 return false;
			});

		});

	}

})(jQuery);