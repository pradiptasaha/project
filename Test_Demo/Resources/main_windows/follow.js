

/*var win = Titanium.UI.currentWindow;
var mountainView = Titanium.Map.createAnnotation({ 
	latitude:37.390749,
	 longitude:-122.081651, 
	 title:"Appcelerator Headquarters", 
	 subtitle:'Mountain View, CA', 
	 pincolor:Titanium.Map.ANNOTATION_RED,
	  animate:true, leftButton: '/image/Login_icon.png',
	   myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS 
	   });

var mapview = Titanium.Map.createView({
	 mapType: Titanium.Map.STANDARD_TYPE,
	  region: {latitude:33.74511, longitude:-84.38993, 
	  	latitudeDelta:0.01, longitudeDelta:0.01}, 
	  	animate:true, 
	  	regionFit:true,
	  	 userLocation:true, 
	  	 annotations:[mountainView]
	  	  });

win.add(mapview);*/
var win = Titanium.UI.currentWindow;  
  
win.setBackgroundImage('/image/BG.png');
 
 var image = Titanium.UI.createImageView({
	url:'/image/dope_upper_bg_lite__withlog_push.png',
	top:0,
	left:0,
	right:0
	
	}); 
win.add(image);

var lbl_vanue = Titanium.UI.createLabel({
    text:'Vanue Name',
    top:80,
    
    height:'auto',
    width:'auto',
    //shadowColor:'#aaa',
    shadowOffset:{x:5,y:5},
    //color:'#900',
    font:{fontSize:25},
    textAlign:'center'
});
win.add(lbl_vanue);

var btn_follow = Titanium.UI.createButton({  
    title:'Follow',  
    backgroundImage:'/image/signup_bg1x.png',
    color:'white',
    top:120, 
    width:90,  
    height:35,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
});  
win.add(btn_follow);

var lbl_vanueDetails = Titanium.UI.createLabel({
    text:' selected vanue details',
    top:160,
    
    height:'auto',
    width:'auto',
    //shadowColor:'#aaa',
    shadowOffset:{x:5,y:5},
    //color:'#900',
    font:{fontSize:15},
    textAlign:'center'
});
win.add(lbl_vanueDetails);



/*var anno1 = Titanium.Map.createAnnotation({
    latitude:26.74, longitude:75.38,
    title:'POI 1',
    pincolor:Ti.Map.ANNOTATION_RED
});
var anno2 = Titanium.Map.createAnnotation({
    latitude:26.75, longitude:75.39,
    title:'POI 2',
    pincolor:Ti.Map.ANNOTATION_RED
});*/
/*var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.SATELLITE_TYPE,
    top:180,
    left:10,
    right:10,
    bottom:10,
    region:{latitude:26.74511, longitude:75.38993, latitudeDelta:0.5, longitudeDelta:0.5},
    animate:true,
    
    regionFit:true,
    userLocation:true,
    annotations:[anno1, anno2]
});
/*mapview.setSatellite(true);
mapview.setStreetView(true);

//mapview.setMapType(Titanium.Map.SATELLITE_TYPE);
win.add(mapview);*/

 