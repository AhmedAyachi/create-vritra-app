import "./index.css";
import {globalizeLanguage} from "resources";


function onDeviceReady(){
    WebView.useStore(({language})=>{
        if(language) globalizeLanguage(language);
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
        //"mainFont","majorFont","minorFont",
        "brandColor","majorColor","minorColor",
        "accentColor","textColor","backgroundColor",
        "okColor","koColor",
    ].forEach(name=>{
        Object.defineProperty(window,name,{
            value:style.getPropertyValue(`--${name}`),
        });
    });
}();
