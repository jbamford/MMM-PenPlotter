/* global Module */

/* MMM-PenPlotter.js
 * 
 * Magic Mirror
 * Module: MMM-PenPlotter
 * 
 * 
 * Magic Mirror By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 * 
 * MMM-PenPlotter.js by Jason Bamford https://jbamford.github.io/
 * 
 * Derivate work of
 * 	Module MMM-ImageSlideshow By Adam Moses http://adammoses.com
 * 	MIT Licensed.
 */
 
Module.register("MMM-ImageSlideshow", {
	// Default module config.
	defaults: {
        // an array of strings, each is a path to a directory with images
        // imagePaths: [ 'modules/MMM-ImageSlideshow/exampleImages' ],
		imagePaths:[],
        // the speed at which to switch between images, in milliseconds 300000 = 5mins
		slideshowSpeed: 65000,
        // if zero do nothing, otherwise set width to a pixel value
        fixedImageWidth: 0,
        // if zero do nothing, otherwise set height to a pixel value        
        fixedImageHeight: 0,
        // if true randomize image order, otherwise do alphabetical
        randomizeImageOrder: false,
        // if true combine all images in all the paths
        // if false each path with be viewed seperately in the order listed
        treatAllPathsAsOne: false,
        // if true, all images will be made grayscale, otherwise as they are
        makeImagesGrayscale: false,
        // list of valid file extensions, seperated by commas
        validImageFileExtensions: 'bmp,jpg,gif,png,svg',
		// a delay timer after all images have been shown, to wait to restart (in ms)
		delayUntilRestart: 0,
	},
    // load function
	start: function () {


        // add identifier to the config
        this.config.identifier = this.identifier;
        // ensure file extensions are lower case
        this.config.validImageFileExtensions = this.config.validImageFileExtensions.toLowerCase();
        // set no error
		this.errorMessage = null;
        if (this.config.imagePaths.length == 0) {
            this.errorMessage = "MMM-ImageSlideshow: Missing required parameter."
        }
        else {
            // create an empty image list
            this.imageList = [];
            // set beginning image index to -1, as it will auto increment on start
            this.imageIndex = -1;
            // ask helper function to get the image list
            this.sendSocketNotification('IMAGESLIDESHOW_REGISTER_CONFIG', this.config);
			// do one update time to clear the html
			this.updateDom();
			// set a blank timer
			this.interval = null;
        }
	},
	// Define required scripts.
	getStyles: function() {
        // the css contains the make grayscale code
		return ["imageslideshow.css"];
	},    
	// the socket handler
	socketNotificationReceived: function(notification, payload) {
		// if an update was received
		if (notification === "IMAGESLIDESHOW_FILELIST") {
			// check this is for this module based on the woeid
			if (payload.identifier === this.identifier)
			{
				// set the image list
				this.imageList = payload.imageList;
                // if image list actually contains images
                // set loaded flag to true and update dom
                if (this.imageList.length > 0) {
                    this.loaded = true;
                    this.updateDom();
					// set the timer schedule to the slideshow speed			
					var self = this;
					this.interval = setInterval(function() {
						self.updateDom();
						}, this.config.slideshowSpeed);					
                }
			}
		}
    },    
	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
        // if an error, say so (currently no errors can occur)
        if (this.errorMessage != null) {
            wrapper.innerHTML = this.errorMessage;
        }
        // if no errors
        else {
            // if the image list has been loaded
            if (this.loaded === true) {
				// if was delayed until restart, reset index reset timer
				if (this.imageIndex == -2) {
					this.imageIndex = -1;
					clearInterval(this.interval);
					var self = this;
					this.interval = setInterval(function() {
						self.updateDom(0);
						}, this.config.slideshowSpeed);						
				}				
                // iterate the image list index
                this.imageIndex += 1;
				// set flag to show stuff
				var showSomething = true;
                // if exceeded the size of the list, go back to zero
                if (this.imageIndex == this.imageList.length) {
					// if delay after last image, set to wait
					if (this.config.delayUntilRestart > 0) {
						this.imageIndex = -2;
						wrapper.innerHTML = "&nbsp;";
						showSomething = false;
						clearInterval(this.interval);
						var self = this;
						this.interval = setInterval(function() {
							self.updateDom(0);
							}, this.config.delayUntilRestart);									
					}
					// if not reset index
					else
						this.imageIndex = 0;
				}
				if (showSomething) {
					
					// create the image dom bit

					var obj = document.createElement('object');
					
					// obj.data = "modules/MMM-ImageSlideshow/example_svg/spiralbezier.svg"
					obj.data = encodeURI(this.imageList[this.imageIndex]);
					obj.type = "image/svg+xml"
					obj.width ="100%"
					obj.height ="100%"
					obj.id = "alphasvg"
							  
					wrapper.appendChild(obj);
								
				}
            }
            else {
                // if no data loaded yet, empty html
                wrapper.innerHTML = "&nbsp;";
            }
        }
        // return the dom
		return wrapper;
	}
});
