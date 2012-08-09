Image resize module for Appcelerator Titanium (Android)
=========================================

Description
-------------------
ImageAsResized is a small image resize module. You can resize image files in Resouces directory and photo images.
Only iOS devices have ImageAsResized function, unless you load this module.


Install
-------------------

First open buiild.properties and fix path info.

	$ export ANDROID_NDK=/path/to/ndk
	$ ant

And see dist directory to find zip file to add on your project.

Code Example
-------------------
* See example for more detailed version.

		button_object.addEventListener('click', function(e){
			var camera = Ti.Media.showCamera({
				success: function(e){
					var image_module = require('org.selfkleptomaniac.ti.imageasresized');
					var media = e.media;
					var h = e.cropRect.height / 2;
					var w = e.cropRect.width / 2;
					var camera_data = image_module.cameraImageAsResized(media ,w, h, 0);
					var camera_image = Ti.UI.createImageView({image:camera_data, canScale:true, height:'auto', width:'auto'});
					win2.add(camera_image);
				},
				error:function(e){alert('failed');},
				cancel:function(e){alert('canceled');},
				allowEditing:true
			});
		});

		var self = Ti.UI.createWindow();
		var cropped_image = image_mod.imageAsResized(64, 106, "images/tzara.jpg", 0);
		var imageView = Ti.UI.createImageView({image:cropped_image, top:250});
		self.add(imageView);

		var cropped_image2 = image_mod.imageAsCropped(24, 56, "images/tzara.jpg", 0, 17, 5);
		var imageView2 = Ti.UI.createImageView({image:cropped_image2, top:380});
		self.add(imageView2);

		var cropped_image3 = image_mod.imageAsCropped(64, 26, "images/tzara.jpg", 0, 0, 80);
		var imageView3 = Ti.UI.createImageView({image:cropped_image3, top:450});
		self.add(imageView3);

		var cropped_image4 = image_mod.imageAsCropped(24, 56, "images/tzara.jpg", 90, 17, 5);
		var imageView4 = Ti.UI.createImageView({image:cropped_image4, top:520});
		self.add(imageView4);


Known Issues
-------------------
Resized image will be cropped when you alter image's proportions. For example, your image file is 123 x 456, when you resize this file to 61.5 x 228, this will break original image's proportions so that resized image will be cropped.
