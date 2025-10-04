import {langdata} from "resources";
 

export const configStore=()=>new Promise(resolve=>{
    const store={
        language:getLanguage(),
    };
    WebView.initiateStore(store,resolve);
});

const getLanguage=()=>{
    const langId=localStorage.getItem("langId");
    let language=langdata[langId];
    if(language){
        //the key starts with "$" to distinguish variables from words.
        language.$id=langId;
    }
    else{
        const preferredLangId=navigator.languages?.find(id=>id in langdata);
        localStorage.setItem("langId",preferredLangId||"en");
        language=getLanguage();
    }
    return language;
}
