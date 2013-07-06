// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	top: -40,
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var wrap2 = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  top: 0
});
win2.add(wrap2);
var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

label2.addEventListener('click', function(e){
	//var camera = Ti.Media.showCamera({
  var limit = 1024 * 1024 * 1;
	var camera = Ti.Media.openPhotoGallery({
		success: function(e){
			Ti.API.info(JSON.stringify(e));
      var tmp_path = Ti.Filesystem.applicationDataDirectory + 'tmp.jpg';
      //var intent = Ti.Android.createIntent({
      //  action: "com.android.camera.action.CROP",
      //  data: tmp_path
      //});
      //intent.putExtra("outputX", 300);
      //intent.putExtra("outputY", 300);
      //intent.putExtra("aspectX", 1);
      //intent.putExtra("aspectY", 1);
      //intent.putExtra("noFaceDetection", true);
      //Ti.Android.currentActivity.startActivityForResult(intent, function(e){
			//  Ti.API.info(JSON.stringify(e));
      //});

			var resized_image = e.media;
			var image_module = require('org.selfkleptomaniac.ti.imageasresized');
      var rate = 16;
      var width = e.cropRect.width / rate;
      var height = e.cropRect.height / rate;
      resized_image = image_module.cameraImageAsResized(resized_image, width, height, 0);
//			var camera_data = image_module.cameraImageAsResized(media , w, h, 0);
//			Ti.API.info(JSON.stringify(camera_data));
			var camera_image = Ti.UI.createImageView({image:resized_image, canScale:true, height:height, width: width});
			wrap2.add(camera_image);
		},
		error:function(e){alert('failed');},
		cancel:function(e){alert('canceled');},
		allowEditing:true
		});
});

wrap2.add(label2);

var orig_height = 2048;
var orig_width = 1536;
var width = orig_width / 16;
var height = orig_height / 16;
 
var r_file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + 'images/boy.jpg');
var r_data = r_file.read();
var sd_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + 'tmp.jpg');
Ti.API.info(sd_file.nativePath);
sd_file.write(r_data);
width = r_data.getWidth() / 16.0;
height = r_data.getHeight() / 16.0;
Ti.API.info('width:' + width);

var wrap = Ti.UI.createScrollView({layout:'vertical', contentWidth: 'auto', contentHeight: 'auto', top:0});

var image_orig = Ti.UI.createImageView({image:'/images/boy.jpg', top:20, width:width, height:height});
wrap.add(image_orig);

var androimage = require('org.selfkleptomaniac.ti.imageasresized');
var image_data = androimage.imageAsResized(width, height, "images/boy.jpg", 0);
var rotated_image_data = androimage.imageAsResized(width, height, "/images/boy.jpg", 90);
var sd_card_image = androimage.imageAsResized(width, height, sd_file.nativePath, 0);
//var sd_card_image = androimage.imageAsResized(width, height, Ti.Filesystem.applicationDataDirectory + 'tmp.jpg', 0);
Ti.API.info(sd_card_image);

var image_view1 = Ti.UI.createImageView({image:image_data, top:20, canScale:true, width:width, height:height});
wrap.add(image_view1);
var image_view2 = Ti.UI.createImageView({image:rotated_image_data, top:20, width:height, height:width});
wrap.add(image_view2);
var image_view3 = Ti.UI.createImageView({image:sd_card_image, top:20, width:width, height:height});
wrap.add(image_view3);

win1.add(wrap);
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
