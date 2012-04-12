var win = Titanium.UI.currentWindow;  
win.setBackgroundImage('/image/BG.png');
//win.setWidth(300);  
//win.setHeight(600);  

var longitude ;
var latitude ;


Titanium.Geolocation.getCurrentPosition(function(e)
	{
		Ti.API.info("received geo response");
		if (e.error)
		{
			//alert(e.error);
		//	label.text = e.error.message;
		//	navActInd.hide();
		//	return;
		
		  longitude = 75.8200;
		  latitude = 26.9200;

		}else
		{
		    longitude = e.coords.longitude;
		  	latitude = e.coords.latitude;
		
		}
		});


  
var image = Titanium.UI.createImageView({
	top:-11,
	url:'/image/Login_icon.png'
	}); 
win.add(image);
var username = Titanium.UI.createTextField({  
    color:'#336699',  
    top:160,  
    left:60,  
    width:320,  
    height:60,  
    hintText:'Username',
    value:'admin@b24.edu',
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
});  
win.add(username);  

  
var password = Titanium.UI.createTextField({  
    color:'#336699',  
    top:240,  
    left:60,  
    width:320,  
    height:60,  
    hintText:'Password',  
    value:'b24',
    passwordMask:true,  
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
});  
win.add(password);  
  
var SignIn = Titanium.UI.createButton({  
    title:'Sign In',  
    color:'white',
    backgroundImage:'/image/signup_bg1x.png',
    top:320, 
    left:100,
    width:120,  
    height:80,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20}  
});  
win.add(SignIn); 

var lbl_or = Titanium.UI.createLabel({
    text:'Or',
    top:340,
    left:220,
    height:'auto',
    width:'auto',
    //shadowColor:'#aaa',
    shadowOffset:{x:5,y:5},
    //color:'#900',
    //font:{fontSize:48},
    textAlign:'center'
});
win.add(lbl_or);

var signUpBtn = Titanium.UI.createButton({  
    title:'Sign Up',  
    backgroundImage:'/image/signup_bg1x.png',
    color:'white',
    top:320, 
    left:250,
    width:120,  
    height:80,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20}  
});  
win.add(signUpBtn); 

var faceBookBtn = Titanium.UI.createButton({  
    //title:'Sign Up',  
    backgroundImage:'/image/Login_SignupFB_button.png',
    color:'white',
    top:430, 
     
    width:270,  
    height:120,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:18}  
});  
win.add(faceBookBtn); 



//******************** Codding

function checkUserNname()
{
	var email=username.value;
    var atPos=email.indexOf('@');
    var dotPos=email.lastIndexOf('.');
    if (username.value == '')  
    {  
        alert("Username is required");
         username.focus();
         return false;
    } 
    
  else if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= email.length) {
        alert("Please enter valid Email Id")
        username.focus();
        return false;
    }
    else if (email.substr(dotPos + 1, email.length) != "edu")
    {
    	alert("Please enter .edu domain only");
   		username.focus();
    	return false;
    }
    else if(password.value == '')
    {
    	alert("Password is required");
    	password.focus();
    	return false;
    }
    else  
    {  
         
        return true;
         
    } 
}

var loginReq = Titanium.Network.createHTTPClient();  

 

SignIn.addEventListener('click',function(e)  
{  
    if(checkUserNname())
    {
    	//alert("dfgd");
    	//loginReq.open("POST","http://192.168.0.8/projects/titanium/post_auth.php");  
    	loginReq.open("POST","http://108.166.93.30/dope_php/post_auth.php");
        var params = {  
            username: username.value,  
         //   password: Ti.Utils.md5HexDigest(password.value)  
             password: password.value,
             device_id:Titanium.Platform.id
            
        };  
        loginReq.send(params);
    }
}); 
//--------
 var SignReq = Titanium.Network.createHTTPClient();  
  
signUpBtn.addEventListener('click',function(e)  
{  
    if (checkUserNname())  
    {  
        //SignReq.open("POST","http://192.168.0.8/projects/titanium/signup.php");  
        SignReq.open("POST","http://108.166.93.30/dope_php/signup.php");
        var params = {  
            username: username.value,  
         //   password: Ti.Utils.md5HexDigest(password.value)  
             password: password.value,
             device_id:Titanium.Platform.id
             
        };  
        SignReq.send(params);
         
    }  
    
}); 

  SignReq.onload = function()  
    {  
    	
        var json = this.responseText;  
        var response = JSON.parse(json);  
       
        
        if (response.logged == true)  
        {  
          //  alert("Successfully saved");  
         // var tabGroup = Titanium.UI.createTabGroup();  
  	 		var username=response.name;
  	 		var user_id=response.userid;
			var login = Titanium.UI.createWindow({  
			    title:'User Authentication Demo',  
			    tabBarHidden:true,  
			    url:'main_windows/verify.js'  
			      
			});  
			  
			//var loginTab = Titanium.UI.createTab({  
			//   title:"verify",  
			//  window:login  
			//}); 
			 
			
		//	tabGroup.addTab(loginTab);  
			login.sessionName  = username;
			login.sessionID=user_id;
			login.lati=latitude;
			login.longi=longitude;
			login.open();
			

        }  
        else  
        {  
            alert(response.message);  
        }  
    }; 

//----------
  loginReq.onload = function()  
    {  
    	alert("hieee");
        var json = this.responseText;  
        var response = JSON.parse(json); 
        //alert(response.logged);
        if (response.logged == true)  
        {  
            //alert("Welcome " + response.userid);  
            	var username=response.name;
            	var user_id=response.userid;
                var details = Titanium.UI.createWindow({  
			    title:'User Authentication Demo',  
			    tabBarHidden:true,  
			    url:'main_windows/teatsearch.js'  
			  
			  }); 
			 /* var loginTab = Titanium.UI.createTab({  
				  title:"Login",  
				  window:login  
				});  
				  
				tabGroup.addTab(loginTab);  
				tabGroup.open(); */
			  details.sessioName  = username;
			  details.sessonID=user_id;
			  details.lati=latitude;
			  details.longi=longitude;
			  details.open();
       
        }  
        else  
        {  
            alert(response.message);  
        }  
            
         
       /* else  
        {  
            alert(response.message);  
        }*/  
    }; 
  
username.addEventListener('focus',function(e)  
{  
	if(username.hintText=="Username")
	{
		username.hintText="";
	}
    
}); 

username.addEventListener('blur',function(e)  
{  
	if(username.hintText=="")
	{
		username.hintText="Username";
	}
    
});

password.addEventListener('focus',function(e)  
{  
	if(password.hintText=="Password")
	{
		password.hintText="";
	}
    
}); 

password.addEventListener('blur',function(e)  
{  
	if(password.hintText=="")
	{
		password.hintText="Password";
	}
    
}); 