import "../index";
import MainView from "./MainView";
import {store} from "../../Store";
import WebViews from "../WebViews";


function onDeviceReady(){
    StatusBar.styleDefault();
    StatusBar.backgroundColorByName(backgroundColor);
    WebView.defineWebViews(WebViews);
    WebView.initiateStore(store,()=>{
        MainView({parent:document.body});
    });
};

document.addEventListener("deviceready",onDeviceReady,false);
document.addEventListener("backbutton",()=>{
    location.hash?history.back():WebView.close();
},false);