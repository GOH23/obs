import React, { createContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion'
import { JP, RU, US } from "country-flag-icons/react/3x2";
export const TranslateContext = createContext();
export const TranslateProvider = ({ children }) => {
    const [Lang, setLang] = useState("RU");
    const [LevelsData,setLevelData] = useState(null);
    const [LoadingState, setLoading] = useState(true)
    const [FirstSesionStart, setFirstSesionStart] = useState({
        step1: false,
        step2: {
            selected: 0,
            state: false
        },
    })
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("FirstSession") || "false")){
            setFirstSesionStart({step1: true,step2: {state: true}})
        }
        if (localStorage.getItem("Language") == null) {
            localStorage.setItem("Language", "RU")
        }
        else {
            setLang(localStorage.getItem("Language"));
        }
        if (localStorage.getItem("StarsData") != null) {
            setLevelData(JSON.parse(localStorage.getItem("StarsData")))
        }
        setLoading(false)
    }, [])
    function SetLanguage(lang) {
        localStorage.setItem("Language", lang)
        window.location.reload();
    }
    function SetStarsData(levelID, Stars) {
        if (localStorage.getItem("StarsData") == null) {
            localStorage.setItem("StarsData", JSON.stringify([{ levelID: levelID, Star: Stars }]));
        } else {
            var Data = JSON.parse(localStorage.getItem("StarsData")).filter((el) => el.levelID != levelID);
            Data.push({ levelID: levelID, Star: Stars })
            localStorage.setItem("StarsData", JSON.stringify(Data));
        }
    }
    function SetFirstTutorial(Lang){
        setFirstSesionStart({ ...FirstSesionStart, step1: true })
        window.localStorage.setItem("FirstSession",JSON.stringify(true));
        SetLanguage(Lang)
    }
    if (LoadingState) {
        return (<div></div>)
    }
    if (!FirstSesionStart.step1 || !FirstSesionStart.step2) {
        return (<div className="start_box">
            <AnimatePresence>
                {!FirstSesionStart.step1 && <motion.div exit={{ x: -100, opacity: 0 }}>
                    <motion.p className="label_setup" initial={{ opacity: 0, y: -100, fontWeight: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>Приветствуем вас на сайте <br /> "Мир открытий"</motion.p>
                    <motion.button whileHover={{ scale: 1.2, color: 'white', backgroundColor: 'rgb(119, 180, 27)' }} className="" onClick={() => { setFirstSesionStart({ ...FirstSesionStart, step1: true, step2: false }) }}>Далее</motion.button>
                </motion.div>
                }

            </AnimatePresence>
            <AnimatePresence >
                {!FirstSesionStart.step2.state && FirstSesionStart.step1 && <motion.div initial={{ opacity: 0, y: -100, fontWeight: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 1.2 }} exit={{ x: -100, opacity: 0 }}>
                    <motion.p className="label_setup">Выберите язык для обучения</motion.p>
                    <motion.div >
                        <motion.button className="button_select" whileHover={{ scale: 1.2, color: 'white', backgroundColor: '#2239AE' }} onClick={() => { SetFirstTutorial("RU");  }}><RU className="flagClass" />RUSSIAN</motion.button>
                        <motion.button className="button_select" whileHover={{ scale: 1.2, color: 'white', backgroundColor: '#2239AE' }} onClick={() => { SetFirstTutorial("US"); }}><US className="flagClass" />ENGLISH</motion.button>
                        <motion.button className="button_select" whileHover={{ scale: 1.2, color: 'white', backgroundColor: '#2239AE' }} onClick={() => { SetFirstTutorial("JP");  }}><JP className="flagClass" />JAPAN</motion.button>
                    </motion.div>

                </motion.div>}
            </AnimatePresence>
        </div>)
    }
    return (<TranslateContext.Provider value={{ Lang,LevelsData, SetLanguage, SetStarsData }}>
        {children}
    </TranslateContext.Provider>)
}