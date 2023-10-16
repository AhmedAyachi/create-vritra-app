import {View} from "vritra";
import css from "./MainView.module.css";


export default function MainView(props){
    const {parent}=props;
    const mainview=View({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
        <p>app created with the create-vritra-app command</p>
    `;
    
    return mainview;
}