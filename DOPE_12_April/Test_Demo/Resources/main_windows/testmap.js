/**
 * @author Administrator
 *//**
 * @author Administrator
 */
var win = Titanium.UI.currentWindow;  
var venues;  
win.setBackgroundImage('/image/BG.png');
var annotations = [];
var anno_search=[];
var data = [];
var count=0;
var data_lat=[];
var data_long=[];
var data_title=[];
var data_subtitle=[];
var tableview ;
var user_id=win.sessonID;
var user_name=win.sessioName;
var title;

//alert(user_name);

var latitude1=win.lati;
var longitude1=win.longi;

var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    top:240,
    left:10,
    right:10,
    bottom:10,
    region:{latitude:latitude1, longitude:longitude1, latitudeDelta:0.05, longitudeDelta:0.05},
    animate:true,
    regionFit:true,
    userLocation:true,
    annotations:[]
   
});





//**********************************************************************************

var xhr = Titanium.Network.createHTTPClient();
win.addEventListener("load",function()
{
				
		xhr.open('GET','http://108.166.93.30/dope_php/public.php?lat='+latitude1+'&lng='+longitude1);
		xhr.send();
	
	
				
	});  
	
	xhr.onerror = function(e)
		{
			Ti.API.info("ERROR " + e.error);
			
		};
	
		xhr.onload = function()
		{
			
			
			var resp =  eval('('+this.responseText+')');
		
		
		var json = this.responseText;  
        var response = JSON.parse(json);  
         venues=response.response.venues;
        
     		 for (var i=0;i<10;i++)
				{
				var annotation = Titanium.Map.createAnnotation({
			    latitude:venues[i].location.lat, longitude:venues[i].location.lng,
			    title:venues[i].name,
			    image:'/image/pin.jpg',	
			   	subtitle:venues[i].id
			    });
			
			
			
			data.push({leftImage:'/image/cha_pic2_1x.png',title:venues[i].name, hasChild:true});
			//data.push({title:venues[i].name});


			annotations.push(annotation);
			mapview.addAnnotation(annotation);

			}
					 var tableViewOptions = {
					data:data,
					top:240,
				    left:10,
				    right:10,
				    bottom:10,
					style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
				//	headerTitle:'TableView examples and test cases',
					//footerTitle:"Wow. That was cool!",
					font:{fontSize:12,fontWeight:'bold'},
					backgroundColor:'white',
					rowBackgroundColor:'white',
					
				};



				tableview = Titanium.UI.createTableView(tableViewOptions);
				//var tableview = Titanium.UI.createTableView();
				
				// create table view event listener
				
				
				// add table view to the window
				tableview.visible=false;
				Titanium.UI.currentWindow.add(tableview);
				
					
			
	
	      	};
	      	
	    
			
	
 

mapview.addEventListener('click',function(e)
{
	  
	 var annotation = e.annotation;
    	//var title = e.title;
     			title = e.title;
			  var lat=e.latitude;
			  var longi=e.longitude;
			//  var user_id=user_id;
			//  var user_name=user_name;
			 var locId=e.subtitle;
	//alert(user_id+user_name);
	//search.value= e.annotation.title;
	try {
	var follow = Titanium.UI.createWindow({  
			    title:'User Authentication Demo',  
			    tabBarHidden:true,  
			    url:'main_windows/follow.js'  
			  
			  }); 
			  follow.name=title;
			  follow.lati=lat;
			  follow.longi=longi;
			  follow.uid=user_id;
			  follow.uname=user_name;
			  follow.locId=locId;
			  
			  
			  follow.open();
			  }
			  catch(e) {
   alert(e.message);
}
});





 var image = Titanium.UI.createImageView({
	url:'/image/dope_upper_bg_lite__withlog_push.png',
	top:0,
	left:0,
	right:0
	}); 
win.add(image);

var btn_Map = Titanium.UI.createButton({  
    title:'Map',  
    color:'white',
    backgroundImage:'/image/signup_bg2x.png',
    top:100, 
    left:120,
    width:120,  
    height:80,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:18}  
});  
win.add(btn_Map); 

var btn_List = Titanium.UI.createButton({  
    title:'List',  
    color:'white',
    backgroundImage:'/image/signup_bg2x.png',
    top:100, 
    left:260,
    width:120,  
    height:80,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:18}  
});  
win.add(btn_List);

var search_image = Titanium.UI.createImageView({
	url:'/image/search box _ 2x.png',
	top:180,
	left:0,
	right:0,
	height:50,
	width:310
	}); 
win.add(search_image);

var search = Titanium.UI.createTextField({  
    color:'#336699',  
    top:180,  
      
    width:310,  
    height:60,  
    
    // font:{fontFamily:'Arial',fontWeight:'bold',fontSize:30},
    //hintText:'Username',  
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
});  
win.add(search); 
//****************************************************************** googlMap api and mapview
 
win.add(mapview);
mapview.setMapType(Titanium.Map.SATELLITE_TYPE);


btn_List.addEventListener('click',function(e)
{
	
	mapview.visible=false;
	tableview.visible=true;
	btn_List.backgroundImage='/image/signin_big_1x.png';
	btn_Map.backgroundImage='/image/signup_bg2x.png';
	btn_List.color='black';
	btn_Map.color='white';
});

btn_Map.addEventListener('click',function(e)
{
	
	mapview.visible=true;
	tableview.visible=false;
	btn_List.backgroundImage='/image/signup_bg2x.png';
	btn_Map.backgroundImage='/image/signin_big_1x.png';
	btn_List.color='white';
	btn_Map.color='black';
});


//************************************************************** table view

if (Ti.Platform.name == 'android') 
{
	Titanium.UI.currentWindow.backgroundColor = '#4e5c4d';
}
else
{
	Titanium.UI.currentWindow.backgroundColor = '#aebcad';
}

// create table view data object
/*
var data = [
	{leftImage:'/image/cha_pic2_1x.png',title:anno1.title,hasChild:true},
	{leftImage:'/image/chat_pic7_1x.png',title:anno2.title,hasChild:true}
	/*{title:'Custom Row Data', hasChild:true, test:'../examples/table_view_custom_rowdata.js'},
	{title:'Headers', hasChild:true, test:'../examples/table_view_headers.js'},
	{title:'Footers', hasChild:true, test:'../examples/table_view_footers.js'},
	{title:'Table API Basic', hasChild:true, test:'../examples/table_view_api_basic.js'},
	{title:'Table Custom Row Header', hasChild:true, test:'../examples/table_view_api_custom_rowheader.js'},
	{title:'Table Section Header', hasChild:true, test:'../examples/table_view_section_header.js'},
	{title:'Table Empty Dataset (Create)', hasChild:true, test:'../examples/table_view_api_emptydata.js'},
	{title:'Append Row', hasChild:true, test:'../examples/table_view_row_append.js'},
	{title:'Delete Row', hasChild:true, test:'../examples/table_view_row_delete.js'},
	{title:'Insert Row', hasChild:true, test:'../examples/table_view_row_insert.js'},
	{title:'Update Row', hasChild:true, test:'../examples/table_view_row_update.js'},
	{title:'Set Row Data', hasChild:true, test:'../examples/table_view_set.js'},
	{title:'Row data from sections', hasChild:true, test:'../examples/table_view_api_sections.js'},
	{title:'Remove all rows', hasChild:true, test:'../examples/table_view_removeall.js'},
	{title:'Empty Table View', hasChild:true, test:'../examples/table_view_empty.js'},
	{title:'Table Auto Height', hasChild:true, test:'../examples/table_view_api_auto_height.js'},
	{title:'Refresh Table View', hasChild:true, test:'../examples/table_view_refresh.js'},
	{title:'Table View Scroll Indicators', hasChild:true, test:'../examples/table_view_scroll_indicators.js'},
	{title:'Composite (Partial Size)', hasChild:true, test:'../examples/table_view_composite.js'},
	{title:'Table View (Layout)', hasChild:true, test:'../examples/table_view_layout.js'},
	{title:'Table View (Layout 2)', hasChild:true, test:'../examples/table_view_layout_2.js'} 

];

data.push({title:'Table Search', hasChild:true, test:'../examples/table_view_api_search.js'});

// add iphone specific tests
if (Titanium.Platform.name == 'iPhone OS')
{
	// these are mostly working in android but require minor fixes
	
	data.push({title:'Table View (Layout 3)', hasChild:true, test:'../examples/table_view_layout_3.js'});
	data.push({title:'Table View (Layout 4)', hasChild:true, test:'../examples/table_view_layout_4.js'});
	data.push({title:'Table View (Layout 5)', hasChild:true, test:'../examples/table_view_layout_5.js'});
	data.push({title:'Table Custom Header', hasChild:true, test:'../examples/table_view_api_custom_header.js'});
	data.push({title:'Table Custom Footer', hasChild:true, test:'../examples/table_view_api_custom_footer.js'});
	data.push({title:'Table with Controls', hasChild:true, test:'../examples/table_view_api_controls.js'});
	data.push({title:'Table with Controls 2', hasChild:true, test:'../examples/table_view_controls_2.js'});	
	data.push({title:'Update Row Objects', hasChild:true, test:'../examples/table_view_update_row_objects.js'});
	data.push({title:'Table View w/Text Field', hasChild:true, test:'../examples/table_view_textfield.js'});
	data.push({title:'Headers with Filter', hasChild:true, test:'../examples/table_view_headers_filter.js'});
	data.push({title:'Table View Options', hasChild:true, test:'../examples/table_view_options.js'});
	data.push({title:'Table with Remote Images', hasChild:true, test:'../examples/table_view_api_remote_images.js'});
	data.push({title:'Table with Remote Images 2', hasChild:true, test:'../examples/table_view_remote_images_2.js'});
	data.push({title:'Table Custom Cell Selection', hasChild:true, test:'../examples/table_view_cell_selection.js'});
	data.push({title:'Grouped w/BG Image', hasChild:true, test:'../examples/table_view_grouped_bg_image.js'});
	data.push({title:'Delete Mode', hasChild:true, test:'../examples/table_view_delete.js'});
	data.push({title:'Delete Mode (2)', hasChild:true, test:'../examples/table_view_delete_2.js'});
	data.push({title:'Delete Mode (3)', hasChild:true, test:'../examples/table_view_delete_3.js'});
	data.push({title:'Move Mode', hasChild:true, test:'../examples/table_view_move.js'});
	data.push({title:'Table Grouped View', hasChild:true, test:'../examples/table_view_api_grouped.js'});
	data.push({title:'Table Empty AppendRow', hasChild:true, test:'../examples/table_view_api_empty_append.js'});
	data.push({title:'Selectable Rows', hasChild:true, test:'../examples/table_view_selectable.js'});
	data.push({title:'Events', hasChild:true, test:'../examples/table_view_events.js'});
	data.push({title:'Touch Events', hasChild:true, test:'../examples/table_view_touch.js'});
	data.push({title:'Edit and Move', hasChild:true, test:'../examples/table_view_edit_and_move.js'});
	data.push({title:'No Scrolling', hasChild:true, test:'../examples/table_view_noscroll.js'});
	data.push({title:'Pull to Refresh', hasChild:true, test:'../examples/table_view_pull_to_refresh.js'});
	data.push({title:'Dynamic Scrolling', hasChild:true, test:'../examples/table_view_dynamic_scroll.js'});
}
// create table view
*/


   

 






