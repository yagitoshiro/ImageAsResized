Image resize module for Appcelerator Titanium (Android)
=========================================

ImageAsResized is a small image resize module. You can resize image files in Resouces directory and photo images.
-------------------

Code Example
-------------------

    button_object.addEventListener('click', function(e){
    	var camera = Ti.Media.showCamera({
    		success: function(e){
    			var image_module = require('org.selfkleptomaniac.ti.imageasresized');
    			var media = e.media;
    			var h = e.cropRect.height / 2;
    			var w = e.cropRect.width / 2;
    			var camera_data = androimage.cameraImageAsResized(media ,h, w);
    			var camera_image = Ti.UI.createImageView({image:camera_data, canScale:true, height:'auto', width:'auto'});
    			win2.add(camera_image);
    		},
    		error:function(e){alert('failed');},
    		cancel:function(e){alert('canceled');},
    		allowEditing:true
    		});
    });
