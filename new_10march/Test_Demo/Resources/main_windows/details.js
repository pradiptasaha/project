/**
 * @author Administrator
 */
var win = Titanium.UI.currentWindow;  
var venues;  
win.setBackgroundImage('/image/BG.png');
var annotations = [];
var data = [];
var tableview ;




var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    top:180,
    left:10,
    right:10,
    bottom:10,
    region:{latitude:26.9200, longitude:75.8200, latitudeDelta:0.1, longitudeDelta:0.1},
    animate:true,
    regionFit:true,
    userLocation:true,
    annotations:[]
});




//**********************************************************************************

Titanium.Geolocation.getCurrentPosition(function(e)
	{
		Ti.API.info("received geo response");
		if (e.error)
		{
			//alert(e.error);
		//	label.text = e.error.message;
		//	navActInd.hide();
		//	return;
		
		var longitude = 75.8200;
		 var latitude = 26.9200;

		}else
		{
		   var longitude = e.coords.longitude;
		  var latitude = e.coords.latitude;
		
		}
		
		
		//label.text = "You are at: "+longitude+"\n"+latitude+"\n\nFinding venues...";

		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e)
		{
			Ti.API.info("ERROR " + e.error);
			//navActInd.hide();
			//alert(e.error);
		};
	//	alert("hello");
		xhr.onload = function()
		{
			//label.hide();
			
			var resp =  eval('('+this.responseText+')');
		//	var venues = resp.groups[0].venues;
		
		var json = this.responseText;  
        var response = JSON.parse(json);  
         venues=response.response.venues;
         //alert(venues.length);
         
      //for (var i=1;i<venues.length;i++)
      for (var i=0;i<5;i++)
			{
							
	         var annotation = Titanium.Map.createAnnotation({
			    latitude:venues[i].location.lat, longitude:venues[i].location.lng,
			    title:venues[i].name,
			    image:'/image/pin.jpg.png'
			    //pincolor:Ti.Map.ANNOTATION_RED
			});
			//{leftImage:'/image/cha_pic2_1x.png',title:anno1.title,hasChild:true},
			
			data.push({leftImage:'/image/cha_pic2_1x.png',title:annotation.title, hasChild:true});
			annotations.push(annotation);
			mapview.addAnnotation(annotation);
        }
         
          /**************
           
           * 
           * 
           */
           var tableViewOptions = {
					data:data,
					top:180,
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
				tableview.addEventListener('click', function(e)
				{
					if (e)
					{
						//alert(e.rowData);  
						var win = Titanium.UI.createWindow({
							url:e.rowData.test,
							title:e.rowData.title
						});
						Titanium.UI.currentTab.open(win,{animated:true});
					}
				});
				
				// add table view to the window
				Titanium.UI.currentWindow.add(tableview);
           
           
           /*
           * 
           * 
           * *******/
          
          
          
          
          
         
        // var data = [];
       //  alert(venues);
		//alert(venues[1].location.lat);
		//alert(venues[1].name);
	//	alert(venues[1].location.lng);
		//alert(venues[1].categories.icon.prefix)
		/*	for (var i=1;i<venues.length;i++)
			{
				data[i]= venues[i].name;
				//alert(data);
			}*/
		
		};
		// open the client and encode our URL
		xhr.open('GET','http://108.166.93.30/dope_php/public.php?lat='+latitude+'&lng='+longitude);
		xhr.send();
		Ti.API.info("sending foursquare API request for "+latitude+","+longitude);
	});


//*******************************************************************

 


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
    backgroundImage:'/image/signup_bg1x.png',
    top:80, 
     left:70,
    width:90,  
    height:35,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
});  
win.add(btn_Map); 

var btn_List = Titanium.UI.createButton({  
    title:'List',  
    color:'white',
    backgroundImage:'/image/signup_bg1x.png',
    top:80, 
    left:160,
    width:90,  
    height:35,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
});  
win.add(btn_List);

var search = Titanium.UI.createTextField({  
    color:'#336699',  
    top:120,  
      
    width:250,  
    height:35,  
    //hintText:'Username',  
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
});  
win.add(search); 
//****************************************************************** googlMap api and mapview
 
win.add(mapview);

mapview.setMapType(Titanium.Map.SATELLITE_TYPE);


/*mapview.addEventListener('click',function(e)
{
	//search.value= e.annotation.title;
	var follow = Titanium.UI.createWindow({  
			    title:'User Authentication Demo',  
			    tabBarHidden:true,  
			    url:'main_windows/follow.js'  
			  
			  }); 
			  
			  follow.open();
});*/

btn_List.addEventListener('click',function(e)
{
	mapview.visible=false;
	tableview.visible=true;
	btn_List.backgroundImage='/image/signin_big_1x.png';
	btn_Map.backgroundImage='/image/signup_bg1x.png';
	btn_List.color='black';
	btn_Map.color='white';
});

btn_Map.addEventListener('click',function(e)
{
	mapview.visible=true;
	tableview.visible=false;
	btn_List.backgroundImage='/image/signup_bg1x.png';
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
	{leftImage:'/image/chat_pic7_1x.png',title:anno2.title,hasChild:true},
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
*/
//data.push({title:'Table Search', hasChild:true, test:'../examples/table_view_api_search.js'});

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



   

 






