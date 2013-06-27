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

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

label2.addEventListener('click', function(e){
	var camera = Ti.Media.showCamera({
		success: function(e){
			Ti.API.info(e);
			var media = e.media;
			var image_module = require('org.selfkleptomaniac.ti.imageasresized');
			var h = e.cropRect.height / 2;
			var w = e.cropRect.width / 2;
			var camera_data = image_module.cameraImageAsResized(media , w, h, 0);
			var camera_image = Ti.UI.createImageView({image:camera_data, canScale:true, height:'auto', width:'auto'});
			win2.add(camera_image);
		},
		error:function(e){alert('failed');},
		cancel:function(e){alert('canceled');},
		allowEditing:true
		});
});

win2.add(label2);

var orig_height = 2048;
var orig_width = 1536;
var width = orig_width / 16;
var height = orig_height / 16;

var wrap = Ti.UI.createScrollView({layout:'vertical', contentWidth: 'auto', contentHeight: 'auto', top:0});

var image_orig = Ti.UI.createImageView({image:'/images/boy.jpg', top:20, width:width, height:height});
wrap.add(image_orig);

var androimage = require('org.selfkleptomaniac.ti.imageasresized');
var image_data = androimage.imageAsResized(width, height, "images/boy.jpg", 0);
var rotated_image_data = androimage.imageAsResized(width, height, "/images/boy.jpg", 90);
Ti.API.info(image_data);

var image_view1 = Ti.UI.createImageView({image:image_data, top:20, canScale:true, width:width, height:height});
wrap.add(image_view1);
var image_view2 = Ti.UI.createImageView({image:rotated_image_data, top:20, width:height, height:width});
wrap.add(image_view2);

win1.add(wrap);
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
