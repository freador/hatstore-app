$(document).ready(function(){

  	$('.img-client').width($('.img-client img').width());
		jQuery.fn.center = function () {
		    this.css("position","absolute");
		    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
		                                                $(window).scrollTop()) + "px");
		    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
		                                                $(window).scrollLeft()) + "px");
		    return this;
		}

      	function handleFileSelect(evt) {
		    var files = evt.target.files; // FileList object

		    // Loop through the FileList and render image files as thumbnails.
		    for (var i = 0, f; f = files[i]; i++) {

		      // Only process image files.
		      if (!f.type.match('image.*')) {
		        continue;
		      }

		      var reader = new FileReader();

		      // Closure to capture the file information.
		      reader.onload = (function(theFile) {
		        return function(e) {
		          // Render thumbnail.
		          var span = document.createElement('span');
		          span.innerHTML = ['<img class="thumb" src="', e.target.result,
		                            '" title="', escape(theFile.name), '"/>'].join('');
		          //document.getElementById('test').insertBefore(span, null);
		          $(".home").fadeOut();$(".home").remove();
        		  $(".static").load("pages/ajuste.html");
		          localStorage.setItem("image", e.target.result);
		          localStorage.setItem("filename", escape(theFile.name));
		        };
		      })(f);

		      // Read in the image file as a data URL.
		      reader.readAsDataURL(f);
		    }
  		}

  		$(".botoes .btn-upload-pc img").click(function () {
    		$("#files").trigger('click');
		});

  	   if(document.getElementById('files')){
  			document.getElementById('files').addEventListener('change', handleFileSelect, false);
  		};
  	$('.general').center();

  	jQuery.fn.imageResize = function () {
		  var image = this;
		  console.log(this.width());
		  var orginalWidth = this.width();
          $("#image-resize").slider({
			    value: 0,
			    min: -100,
			    max: 100,
			    slide: function (event, ui) {
			    	console.log(ui.value);
			        var fraction = (1 + ui.value / 100),
			            newWidth = orginalWidth * fraction;
			       image.width(newWidth);
			    }
				});
	};

	jQuery.fn.imageRotation = function () {

	  var image = this;
	  var orginalWidth = this.width();
	  	$( "#image-rotation" ).slider();
		$("#image-rotation").slider({
		    value: 0,
		    min: -100,
		    max: 100,
		    slide: function (event, ui) {
		    	ui.value = ui.value*3.60;

				image.css({'transform':'rotate('+ui.value+'deg)','-ms-transform':'rotate('+ui.value+'deg)', '-webkit-transform':'rotate('+ui.value+'deg)'});
		        //image.width(newWidth);
		    }
		});
	};
	

  	$('.img-client img').draggable({
    cursor: 'move',        // sets the cursor apperance
    opacity: 0.35,         // opacity fo the element while it's dragged
    stack: $('#dg1')       // brings the '#dg1' item to front
  	});

$('.img-client img').imageResize();
$('.img-client img').imageRotation();
 

});

