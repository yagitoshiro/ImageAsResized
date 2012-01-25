# imageasresized Module

## Description

ImageAsResized is tiny image resize/rotate module for Android. You can resize images in your Resouces directory and your photo/gallerey pictures.

## Accessing the imageasresized Module

To access this module from JavaScript, you would do the following:

	var imageasresized = require("org.selfkleptomaniac.ti.imageasresized");

The imageasresized variable is a reference to the Module object.	

## Reference

Images in Resources directory can be resized by imageasresized.imageAsResized function. It takes 4 arguments: the first argument is image width, 2nd is image height and the 3rd one is rotatory angle.

You can resize your photo with imageasresized.cameraImageAsResized function. It takes 4 argeuments: the first argument is TiBlob, the 2nd is image width, 3rd one is image height and the last one is for rotatory angle.

### ___PROJECTNAMEASIDENTIFIER__.function

  imageAsResized(width, height, file, angle)
  cameraImageAsResized(TiBlob, width, height, angle)

### ___PROJECTNAMEASIDENTIFIER__.property

n/a

## Usage

  var new_w = 100;
  var new_h = 100;
  
  var image = imageasresized.imageAsResized(new_w, new_h, 'images/test.jpg', 0);
  var resized = Ti.UI.createImageView({image:image, width:new_w, height:new_h, top:300});
  
  
  button_object.addEventListener('click', function(e){
      var camera = Ti.Media.showCamera({
          success: function(e){
              var media = e.media;
              var h = e.cropRect.height / 2;
              var w = e.cropRect.width / 2;
              var camera_data = imageasresized.cameraImageAsResized(media ,w, h, 0);
              var camera_image = Ti.UI.createImageView({image:camera_data, canScale:true, height:'auto', width:'auto'});
              win2.add(camera_image);
          },
          error:function(e){alert('failed');},
          cancel:function(e){alert('canceled');},
          allowEditing:true
    });
  });

## Author

Toshiro Yagi
yagitoshiro@gmail.com

## License

MIT License. Free as in freedom.
