// This is a shortcut to "ready"
$(function() {

    // Leveraging jQueryUI tabs for this
    // Initialize main tab
   	$("#content").tabs();

    // Sub-tabs
    $("#photography-tabs").tabs({
        show: {
            effect: 'fadeIn',
            duration: 400
        }
    });

    // Went with fancybox2: http://fancyapps.com/fancybox/
    // (featherlight was also good: http://noelboss.github.io/featherlight/)
    $(".fancybox").fancybox({
        padding: 0
    });

   	// These are maintained in a separate file for ease of editing
   	var imageList = window.siteSettings.galleryImageUrls;
   	var imageSwapTime = window.siteSettings.gallerySwapDelay;
   	var currentImageIndex = 0; // will increment each time, but we already start on the first, so it will be 1
    var imageParentElement = $('#inset-content-wrapper');
    
   	function loadNextGalleryImage(){
   		// manage index
   		if(currentImageIndex >= imageList.length - 1){
   			currentImageIndex = 0;
   		} else {
   			currentImageIndex++;
   		}

   		// Load image as a detached dom img, then set
   		var imageUrl = imageList[currentImageIndex];
        
        $.when(promiseLoadImageAsync(imageUrl))
            .then(function (imageElement) {
                //debugger;
                // remove the previously existing img and replace with the newly-loaded one.
                // the browser will cache img src loading very well
                imageParentElement.children('img#content-gallery-image').remove();
                imageParentElement.append(imageElement)
            })
            .always(function(){
                // even if we failed to load, move on after a bit
                triggerLoadAfterTimeout();
            });
   	}

    function triggerLoadAfterTimeout(){
        setTimeout(function(){
            loadNextGalleryImage();
        }, imageSwapTime);
    }
    
    // loads an image into a new DOM element
    function promiseLoadImageAsync(source) {
        console.log('promiseLoadImageAsync', source);
        return $.Deferred (function (task) {
            var image = new Image();
            image.onload = function () {task.resolve(image);}
            image.onerror = function () {task.reject();}
            image.src = source;
            image.id = 'content-gallery-image';
        }).promise();
    }
    
   	// kick it of initially 
   	triggerLoadAfterTimeout();
   	
    // IMAGE GALLERY LOADING:
    
     // Going to do some tricky stuff here with image loading:
     // Each image is pointing to a placeholder, but has a data-src
     // attribute that we can use to kick off ajax requests to get the content
     var galleryImages = $('.image-gallery img');

     $.each(galleryImages || [], function(index, galleryImage){
       var imageObj = $(galleryImage); // when we ran the .each, we removed the jquery context
       var imageUrl = imageObj.data('src');
       imageObj.attr('src', imageUrl);
     });

});
