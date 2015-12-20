// This is a shortcut to "ready"
$(function() {

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

   	var currentImageIndex = -1; // will increment to 0
   	var imageElement = $('#content-gallery-image');

   	function setGalleryImage(){
   		console.log('setGalleryImage index', currentImageIndex)

   		// manage index
   		if(currentImageIndex >= imageList.length - 1){
   			currentImageIndex = 0;
   		} else {
   			currentImageIndex++;
   		}

   		// set image src
   		var imageUrl = imageList[currentImageIndex];
   		imageElement.attr('src', imageUrl);
   		//console.log('image src', imageUrl)
   	}

   	// function to be called each time
   	var intervalHandle = setInterval(setGalleryImage, imageSwapTime);

   	// do it immediately first time
   	setGalleryImage();

   	// note: can call 'clearInterval(intervalHandle)' if necessary

     // Going to do some tricky stuff here with image loading:
     // Each image is pointing to a placeholder, but has a data-src
     // attribute that we can use to kick off ajax requests to get the content
     var galleryImages = $('.image-gallery img');

     $.each(galleryImages || [], function(index, galleryImage){
       var imageObj = $(galleryImage); // when we ran the .each, we removed the jquery context
       var imageUrl = imageObj.data('src');
       imageObj.attr('src', imageUrl);
       console.log('setting gallery image src', imageUrl);
     });

});
