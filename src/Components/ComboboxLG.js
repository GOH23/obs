import { US, RU, JP } from 'country-flag-icons/react/3x2'
import { useContext, useState } from 'react'
import { AiFillCaretDown } from "react-icons/ai";
import "./../Styles/combobox.css"
import DropdownDivider from 'react-bootstrap/esm/DropdownDivider';
import { TranslateContext } from '../Static/TranslateContext';
import { TData } from '../Static/TranslateData';
export default function ComboboxLG() {
    var {Lang,SetLanguage} = useContext(TranslateContext)
    var [StateComboBox, SetStateComboBox] = useState({
        SelectedLang: TData.filter((m)=>m.lang == Lang)[0].flag,
        StateOpen: false
    });
    function OpenBox() {
        SetStateComboBox({
            SelectedLang: StateComboBox.SelectedLang,
            StateOpen: !StateComboBox.StateOpen
        })
    }
    function SelectFlag(flagComp,flag){
        SetStateComboBox({
            SelectedLang: flagComp,
            StateOpen: !StateComboBox.StateOpen
        })
        SetLanguage(flag)
    }
    return (<div className='relative_box'>
        <div className='style_combobox'>
            {StateComboBox.SelectedLang}
            <AiFillCaretDown onClick={OpenBox} style={{cursor: "pointer"}} className={StateComboBox.StateOpen ? "rotate_180" : ""} />
        </div>
        {StateComboBox.StateOpen && <div className='flags_box' >
            <div className='flag_'  onClick={()=>SelectFlag(<RU className='flag_style'/>,"RU")}>
                <RU />
                <p>RU</p>
            </div>
            <DropdownDivider />
            <div className='flag_'  onClick={()=>SelectFlag(<US className='flag_style'/>,"US")}>
                <US />
                <p>EN</p>
            </div>
            <div className='flag_' onClick={()=>SelectFlag(<JP className='flag_style'/>,"JP")}>
                <JP />
                <p>JP</p>
            </div>

        </div>}
    </div>)
}