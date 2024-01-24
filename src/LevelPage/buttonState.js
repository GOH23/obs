import { useContext, useState } from "react";
import { TranslateContext } from "../Static/TranslateContext";

export default function ButtonGroup(props) {
    
    var {Lang} = useContext(TranslateContext)

    const [ActiveButton, SetActiveButton] = useState();
    function ClickedAnswer(currentQuiestion,ind) {
        SetActiveButton(ind)
        props.onClick(currentQuiestion, ind+1);
    }
    return (<div className="ans_style">
        {props.answers.map((el, ind) => {
            return (<button className={ActiveButton == ind ? "active" : undefined} onClick={() => ClickedAnswer(props.currentQuiestion,ind)} key={ind}>{Lang == "RU" ? el.name : Lang == "US" ? el.nameEN : el.nameJP}</button>)
        })}
    </div>)
}