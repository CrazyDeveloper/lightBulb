// TODO  * If image that has been clicked is already loaded do not call event
// TODO  * Check if image is valid and source can be accessed
// TODO  * Need to clear Q when clicking on new images(prevent abuse)

// ; Put in case that some other function is not closed properly
;(function ($) {

	// Constructor
	$.fn.lightBulb = function(options) {
		// Default values
		var defaultVal = {
			background   : '#D4D4CA',
			opacity      : 0.5,
			holderHeight : "1600px",
			holderWidth  : "1600px"
		};

		// jQuery methods for combinig defaults and passed values
		var params = $.extend ( {}, defaultVal, options );

		// Holder for images
		var el  =  {
			holder    : 'lightBolobHolder',   // Main contaner
            jQWrap    : "#lightBolobHolder", // jQuery wrapper for main conatner
            imgWrap   : 'holder',           // Wrapper for image inside main wrapper
            jQimgWrap : '#holder'          // jQuery wrapper for image
		};

        privatePropeties  =  {
            niz  : [],
            elementsList : '',
            element   : ''
        };
		// Public method applied for plug in... Got to make it private
		// Don't want to get messed up with other JS or jQ
		var publicMethodes = {
			checkImg : function (orWidth, orHeight, width, height) {
				if ( (orWidth === width) || (orHeight === height) ) {
					return false;
				}
			},

			appendIt : function(e,w,h) {
                // Perform animation for lightBulb holder
                // Get current img values and values of wrapper for animate
                // Call .animate(), upon complete append image :-)
                $(el.jQimgWrap).html("<img id='loader' src='ajax-loader.gif'/>");
                $("#close-img").show().css('display', 'block');
                var lightBulbWidth  = $(el.jQWrap).width();
                var lightBulbHeight = $(el.jQWrap).height();

                 $(el.jQWrap).animate({
                    width : w+60,
                    height: h+60
                    },100, function() {
                        $(el.jQimgWrap).html(e);
                    });
			},
            nextImg : function() {
               $("#holder").click(function(){

                    // Get current selected element from list
                   var currentEl = privatePropeties.elementsList;
                   privatePropeties.niz = privatePropeties.element.siblings();
                   if( privatePropeties.niz.length >= currentEl+1) {
                       var element = privatePropeties.niz[currentEl];
                       var imgSrc = $(element).first().context.childNodes[1].src;
                       var fullImg = "<img src='"+imgSrc+"'/>";
                       console.log(element);
                       var imgWidth = $(element).first().context.childNodes[1].naturalWidth;
                       var imgHeight = $(element).first().context.childNodes[1].naturalHeight;
                      publicMethodes.appendIt(fullImg,imgWidth, imgHeight);
                       privatePropeties.elementsList += 1;
                   }
               });
            },

            // Close preview loader if clicked on body
            closeOnBody : function () {
                    $("span#close-img").click(function(){

                        $(el.jQimgWrap).css("height","0px").html('');
                        $(el.jQWrap).css( "height", "0px");
                        $("#close-img").hide();
                        return false;
                    });
                $(el.jQWrap).click(function(){
                    return false;
                });
                $("body").click( function  () {
                    $(el.jQimgWrap).css("height","0px").html('');
                    $(el.jQWrap).css( "height", "0px");
                    $("#close-img").hide();
                    return false;
                });

            },

			//Main init
			init : function() {
                this.closeOnBody();
                this.nextImg();
				// Append container for images position it abslute and keep it hidden
                // Check if container already exists, if true return false and do not append

                if ($(el.jQWrap).height() === null ){
                    $("body").append("<div id='"+el.holder+"'></div>");
                    $(el.jQWrap).append("<span id='close-img'>&#10006;</span>");
                    $(el.jQWrap).append("<div id='"+el.imgWrap+"'></div>");

                    //Get values for css
                    $("#"+el.holder).css({
                        'max-width'      : params.holderWidth,
                        'max-height'     : params.holderHeight,
                        'background'     : params.background,
                        'position'       : 'absolute',
                        'top'            : '150px',
                        'left' 	         : '150px',
                        'z-index'        : 10
                    });
                }
            }
		};

        publicMethodes.init();

		// Binding methods for each element
		return this.children().each ( function() {

			$(this.firstElementChild).live("click", function(){
                privatePropeties.elementsList = $(this).parent().index();
                privatePropeties.element = $(this).parent();
                var img = "<img src='"+$(this).context.src+"'/>";
                var imgWidth   = $(this).context.naturalWidth;
                var imgHeight  = $(this).context.naturalHeight;
				publicMethodes.appendIt(img,imgWidth, imgHeight );
				 return false;
			});

		});



	}

})(jQuery);