

export {default as langdata} from "./LangData.json";

export const globalizeLanguage=(language)=>{
    const langId=language.$id||language._id||language.id;
    localStorage.setItem("langId",langId);
    document.documentElement.setAttribute("lang",langId);
    window.language=Object.freeze({
        ...language,
        get:(key)=>key?(language[key]||key):"",
    });
}
