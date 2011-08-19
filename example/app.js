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
			var camera_data = androimage.cameraImageAsResized(media ,h, w);
			var camera_image = Ti.UI.createImageView({image:camera_data, canScale:true, height:'auto', width:'auto'});
			win2.add(camera_image);
		},
		error:function(e){alert('failed');},
		cancel:function(e){alert('canceled');},
		allowEditing:true
		});
});

win2.add(label2);

var wrap = Ti.UI.createView({layout:'vertical', top:20});

var image_orig = Ti.UI.createImageView({image:'images/face.jpg', top:20, width:176, height:130});
wrap.add(image_orig);

var androimage = require('org.selfkleptomaniac.ti.imageasresized');
var image_data = androimage.imageAsResized(88, 65, "images/face.jpg", 0);
var rotated_image_data = androimage.imageAsResized(108, 85, "images/face.jpg", 90);

var image_view1 = Ti.UI.createImageView({image:image_data, top:50, canScale:true, width:'auto', height:'auto'});
wrap.add(image_view1);
//var image_view2 = Ti.UI.createImageView({image:rotated_image_data, top:50, width:'auto', height:'auto'});
//wrap.add(image_view2);

win1.add(wrap);
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
