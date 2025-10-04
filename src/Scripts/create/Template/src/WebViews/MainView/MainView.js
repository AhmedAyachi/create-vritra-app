import {View} from "vritra";
import css from "./MainView.module.css";


export default function MainView(props){
    const {parent,store}=props;
    const mainview=View({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
        <p>${language.get("$message")}</p>
    `;
    
    return mainview;
}
