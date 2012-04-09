//Titanium.UI.setBackgroundImage('/image/BG.png');  
//****************************************************************
//var tabGroup = Titanium.UI.createTabGroup();  
  
var login = Titanium.UI.createWindow({  
    //title:'User Authentication Demo',  
    //tabBarHidden:true,  
    url:'main_windows/login.js'  
});  
  
//var loginTab = Titanium.UI.createTab({  
//title:"Login",  
//window:login  ,
//visible:false
//});  
  
//tabGroup.addTab(loginTab);  
//tabGroup.open();
login.open();

//****************************************************************

/*Titanium.UI.setBackgroundColor('#000');
 
// create tab group
var tabGroup = Titanium.UI.createTabGroup();
 
 
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'/image/Login_icon.png',
    title:'Tab 1',
    window:win1
});
 
var btn = Ti.UI.createButton({
    title: "Draw Bermuda Triangle",
    width: 250,
    height: 40,
    top:0
});
 
win1.add(btn);
 
var htmlFile = 'map.html';
 
var wv = Ti.UI.createWebView({
    url: htmlFile,
    top:40
});
win1.add(wv);
 
function drawPolygon() {
    var triangleCoords = [
        //new google.maps.LatLng(25.774252, -80.190262),
        //new google.maps.LatLng(18.466465, -66.118292),
        //new google.maps.LatLng(32.321384, -64.75737),
        //new google.maps.LatLng(25.774252, -80.190262)
       new google.maps.LatLng(40.7, -74)
    ];
 
    // Construct the polygon
    bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35
    });
 
   bermudaTriangle.setMap(map);
}
 
 
btn.addEventListener('click', function() {
    // Here we use evalJS to inject javascript code into the WebView context 
        // and then we can the just injected function
    wv.evalJS(drawPolygon.toString() + "drawPolygon();");
});
 
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});
 
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
 
 
// open tab group
tabGroup.open();
*/
