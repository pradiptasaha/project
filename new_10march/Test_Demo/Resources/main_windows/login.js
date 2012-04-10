var win = Titanium.UI.currentWindow;  
win.setBackgroundImage('/image/BG.png'); 
  
var image = Titanium.UI.createImageView({
	top:-11,
	url:'/image/Login_icon.png'
	}); 
win.add(image);
var username = Titanium.UI.createTextField({  
    color:'#336699',  
    top:160,  
    left:40,  
    width:370,  
    height:60,  
    hintText:'Username',
    value:'pushp@singh.edu',
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
});  
win.add(username);  

  
var password = Titanium.UI.createTextField({  
    color:'#336699',  
    top:240,  
    left:40,  
    width:370,  
    height:60,  
    hintText:'Password',  
    value:'123456',
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
    width:110,  
    height:60,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
});  
win.add(SignIn); 

var lbl_or = Titanium.UI.createLabel({
    text:'Or',
    top:340,
    left:210,
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
    left:240,
    width:110,  
    height:60,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
});  
win.add(signUpBtn); 

var faceBookBtn = Titanium.UI.createButton({  
    //title:'Sign Up',  
    backgroundImage:'/image/Login_SignupFB_button.png',
    color:'white',
    top:430, 
     
    width:270,  
    height:150,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
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
			login.sessionID  = username;
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
    	
        var json = this.responseText;  
        var response = JSON.parse(json); 
        //alert(response.logged);
        if (response.logged == true)  
        {  
            //alert("Welcome " + response.name);  
            var login = Titanium.UI.createWindow({  
			    title:'User Authentication Demo',  
			    tabBarHidden:true,  
			    url:'main_windows/details.js'  
			  
			  }); 
			 /* var loginTab = Titanium.UI.createTab({  
				  title:"Login",  
				  window:login  
				});  
				  
				tabGroup.addTab(loginTab);  
				tabGroup.open(); */
			  login.open();
       
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