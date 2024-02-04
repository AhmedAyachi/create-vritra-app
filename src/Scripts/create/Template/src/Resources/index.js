

export {default as langdata} from "./LangData.json";

export const globalizeLanguage=(language)=>{
    document.documentElement.setAttribute("lang",language.$id);
    window.language=Object.freeze(language);
}
