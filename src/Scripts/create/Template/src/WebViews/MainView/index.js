import "../index";
import MainView from "./MainView";
import {store} from "../../Store";
import WebViews from "../WebViews";
import {globalizeLanguage} from "resources";


function onDeviceReady(){
    StatusBar.styleDefault();
    WebView.defineWebViews(WebViews);
    WebView.initiateStore(store,(store)=>{
        globalizeLanguage(store.language);
        MainView({parent:document.body,store});
    });
};

document.addEventListener("deviceready",onDeviceReady,false);
document.addEventListener("backbutton",()=>{
    location.hash?history.back():WebView.close();
},false);