$(document).ready(function(){

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

  	document.getElementById('files').addEventListener('change', handleFileSelect, false);

  	$('.general').center();

});
