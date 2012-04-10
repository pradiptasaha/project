var win = Titanium.UI.currentWindow;  
win.setBackgroundImage('/image/BG.png'); 

var image = Titanium.UI.createImageView({
	top:0,
	url:'/image/Login_icon.png'
	}); 
win.add(image);

//alert(win.sessionID)

var lbl_text = Titanium.UI.createLabel({
    text:'A verification code was sent to your e-mail.\n Please confirm your ID',
    top:130,
    height:'auto',
    width:'auto',
    //shadowColor:'#aaa',
    shadowOffset:{x:5,y:5},
    //color:'#900',
    //font:{fontSize:48},
    textAlign:'justify'
});
win.add(lbl_text);

var txt_vcode = Titanium.UI.createTextField({  
    color:'#336699',  
    top:180,  
    left:10,  
    width:300,  
    height:40,  
    hintText:'Code',  
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
});  
win.add(txt_vcode);

var btn_ok = Titanium.UI.createButton({  
    title:'Ok',  
    color:'white',
    backgroundImage:'/image/signup_bg1x.png',
    top:220, 
    
    width:90,  
    height:35,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
});  
win.add(btn_ok); 

var SignReq = Titanium.Network.createHTTPClient();  
  
btn_ok.addEventListener('click',function(e)  
{  
    if (txt_vcode.value != '' )  
    {  
        //SignReq.open("POST","http://192.168.0.8/projects/titanium/verify.php");
        SignReq.open("POST","http://108.166.93.30/dope_php/verify.php");  
        var params = {  
            username: win.sessionID,  
         //   password: Ti.Utils.md5HexDigest(password.value)  
            code: txt_vcode.value
        };  
        SignReq.send(params);
         
    }  
    else  
    {  
        alert("Verify code required");  
    }  
}); 

  SignReq.onload = function()  
    {  
    	
        var json = this.responseText;  
        var response = JSON.parse(json);  
       
        if (response.logged == true)  
        {  
            alert("Successfully saved");  
            var tabGroup = Titanium.UI.createTabGroup();
            var login = Titanium.UI.createWindow({  
			    title:'User Authentication Demo',  
			    tabBarHidden:true,  
			    url:'main_windows/details.js'  
			  
			  }); 
			 /* var loginTab = Titanium.UI.createTab({  
				  title:"Login",  
				  window:login  
				});*/  
				  
				//tabGroup.addTab(loginTab);  
				//tabGroup.open(); 
			  //login.open();
       
        }  
        else  
        {  
            alert(response.message);  
        }  
    }; 


txt_vcode.addEventListener('focus',function(e)  
{  
	if(txt_vcode.hintText=="Code")
	{
		txt_vcode.hintText="";
	}
    
}); 

txt_vcode.addEventListener('blur',function(e)  
{  
	if(txt_vcode.hintText=="")
	{
		txt_vcode.hintText="Code";
	}
    
});

 

  
