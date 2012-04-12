

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

var u_id=win.uid;
var lati=win.lati;
var longi=win.longi;
var name=win.name;
var loc_id=win.locId;
  
win.setBackgroundImage('/image/BG.png');

var isfollow='0';


var followcheck = Titanium.Network.createHTTPClient();  
win.addEventListener("load",function(){
	followcheck.open("POST","http://108.166.93.30/dope_php/check_follow.php");
        var params = {  
            user_id: u_id,  
             location_id: loc_id,
          
             
        };  
        followcheck.send(params);
	}
);


followcheck.onload = function()  
    {  
    	
        var json = this.responseText;  
        var response = JSON.parse(json);  
         lbl_vanue.text=name;
        //lbl_vanue.text="username";
        if (response.logged == true)  
        {  
          
			//alert("enable button");
			btn_follow.title="Follow",
			isfollow='0';
        }  
        else  
        {  
           // alert("disable button");  
           btn_follow.title="Unfollow",
            isfollow='1';
        }  
    }; 
 
 var image = Titanium.UI.createImageView({
	url:'/image/dope_upper_bg_lite__withlog_push.png',
	top:0,
	left:0,
	right:0
	
	}); 
win.add(image);

var lbl_vanue = Titanium.UI.createLabel({
    text:'Vanue Name',
    top:100,
    
    height:'auto',
    width:'auto',
    //shadowColor:'#aaa',
    shadowOffset:{x:5,y:5},
    //color:'#900',
    font:{fontSize:40},
    textAlign:'center'
});
win.add(lbl_vanue);

var btn_follow = Titanium.UI.createButton({  
    title:'Follow',  
    backgroundImage:'/image/signup_bg1x.png',
    color:'white',
    top:170, 
    width:200,  
    height:100,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:30}  
});  
win.add(btn_follow);

var lbl_vanueDetails = Titanium.UI.createLabel({
    text:'Following this place will allow the business to push 1-2 message to your phone per week.\n message will be either deals or special invites',
    top:270,
    
    height:'auto',
    width:'auto',
    //shadowColor:'#aaa',
    shadowOffset:{x:5,y:5},
    //color:'#900',
    font:{fontSize:30},
    textAlign:'center'
});
win.add(lbl_vanueDetails);



var followReq = Titanium.Network.createHTTPClient();  
  
btn_follow.addEventListener('click',function(e)  
{  
	//alert(isfollow);
    	if (isfollow=='0')  
    	{  
        	followReq.open("POST","http://108.166.93.30/dope_php/follow.php");
            var params = {  
            user_id: u_id,  
             location_id: loc_id,
             location_lati:lati,
             location_longi:longi,
             location_name:name,
             
        };  
        followReq.send(params);
             
        }  
        else{
        	alert("you have already follow it");
        }
        
       
         
    }  
    ); 

  followReq.onload = function()  
    {  
    	
        var json = this.responseText;  
        var response = JSON.parse(json);  
       
       
        if (response.logged == true)  
        {  
        	btn_follow.title="Unfollow",
          isfollow=0;
        }  
        else  
        {  
            alert("failed to perform operation");  
        }  
    }; 



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

 