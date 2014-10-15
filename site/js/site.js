// This is a shortcut to "ready"
$(function() {
	// Initialize main tab
   	$("#content").tabs();

   	// Get images ready
   	//debugger;

   	var imageList = [
   		"http://www.lanzaroteoceanfilmfestival.eu/wp-content/uploads/2011/12/jellyfish_865.jpg",
   		"http://15pictures.com/wp-content/gallery/15-pictures-jellyfish/jellyfish-8.jpg",
   		"http://images3.alphacoders.com/207/207317.jpg",
   		"http://hwcdn.iplayerhd.com/data/d/37f0d78d.jpg"
   	];

   	var currentImageIndex = -1; // will increment to 0
   	var imageSwapTime = 5000; // in ms
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
   		console.log('image src', imageUrl)
   	}

   	// function to be called each time
   	var intervalHandle = setInterval(setGalleryImage, imageSwapTime);

   	// do it immediately first time
   	setGalleryImage();

   	// can call 'clearInterval(intervalHandle) if necessary'
});