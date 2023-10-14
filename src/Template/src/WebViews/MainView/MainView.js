import {View} from "wurm";
import css from "./MainView.module.css";


export default function MainView(props){
    const {parent}=props;
    const mainview=View({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
        <p>app created with the create-wurm-app command</p>
    `;
    
    return mainview;
}