import "./index.css";
import {globalizeLanguage} from "resources";


function onDeviceReady(){
    WebView.useStore(({language})=>{
        language&&globalizeLanguage(language);
    });
    if(cordova.platformId==="ios"){
        window.addEventListener("touchend",()=>{
            const {activeElement}=document;
            if(activeElement!==document.body){
                Keyboard&&Keyboard.isVisible&&Keyboard.hide();
                activeElement.click();
            }
        });
    }
};

document.addEventListener("deviceready",onDeviceReady,false);

!function globalizeCssVars(){
    const style=getComputedStyle(document.documentElement);
    Object.defineProperty(window,"rem",{
        value:parseFloat(style.getPropertyValue("font-size")),
    });
    [
        "mainFont","majorFont","minorFont",
        "mainColor","majorColor","minorColor",
        "textColor","accentColor","backgroundColor",
    ].forEach(name=>{
        Object.defineProperty(window,name,{
            value:style.getPropertyValue(`--${name}`),
        });
    });
}();
