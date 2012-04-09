Titanium.UI.setBackgroundColor('#fff');  
var tabGroup = Titanium.UI.createTabGroup();  
  
var login = Titanium.UI.createWindow({  
    title:'User Authentication Demo',  
    tabBarHidden:true,  
    url:'main_windows/login.js'  
});  
  
var loginTab = Titanium.UI.createTab({  
    title:"Login",  
    window:login  
});  
  
tabGroup.addTab(loginTab);  
tabGroup.open();