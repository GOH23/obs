import Container from "react-bootstrap/esm/Container";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "./../Styles/pages/level_page.css"
// import required modules
import { Pagination } from 'swiper/modules';
import { useContext, useRef, useState } from "react";
import { GetLevelData, jsonData } from "../Levels/Level1";
import { Link, useParams } from "react-router-dom";
import ButtonGroup from "./buttonState";
import { FaStar } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { TranslateContext } from "../Static/TranslateContext";
export default function LevelPage(props) {
    var { Lang, SetStarsData } = useContext(TranslateContext)

    const SwiperLvl = useRef(null)
    const [CheckResults, SetCheckResults] = useState(false);
    var [Stars, SetStars] = useState(0)
    const [FinalResults, setFinalRes] = useState([])
    const params = useParams();
    const LevelState = useState(GetLevelData(params.id).Ans);
    const pagination = {
        clickable: false,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    function NextClick(curentQuiestion, AnsInd) {
        setFinalRes([...FinalResults, { correct_ans: curentQuiestion.correct_ans, yourAns: AnsInd, ResultCheck: curentQuiestion.correct_ans == AnsInd ? true : false }])
        SwiperLvl.current.slideNext();
    }

    function ClickToCheckRes() {
        SwiperLvl.current.disable()
        var x = (FinalResults.filter(n => n.ResultCheck).length * 100) / FinalResults.length
        console.log(x);
        if (x > 90) {
            SetStars(3)
            SetStarsData(params.id, 3)
            return
        }
        if (x > 50) {
            SetStars(2)
            SetStarsData(params.id, 2)
            return
        }
        if (x > 33) {
            SetStars(1)
            SetStarsData(params.id, 1)
            return
        }else{
            SetStars(0)
            SetStarsData(params.id, 0)
        }
    }
    return (<main>

        <Container>
            {!CheckResults && <Swiper
                pagination={pagination}
                modules={[Pagination]}
                slidesPerView={1}
                slidesPerGroup={1}

                className="mySwiper"
                grabCursor={false}
                onBeforeInit={(swiper) => {
                    SwiperLvl.current = swiper;
                }}>
                {LevelState[0].map((el, ind) => {
                    return (<SwiperSlide className="question_block" key={ind}>
                        <div className="question">
                            <p>{Lang == "RU" ? el.name : Lang == "US" ? el.nameEN : el.nameJP}</p>
                        </div>
                        <ButtonGroup currentQuiestion={el} ansInd={ind} answers={el.answers} onClick={NextClick} />
                    </SwiperSlide>)
                })}
                <SwiperSlide className="Results">

                    {!CheckResults && <button className="nextQuestion" onClick={() => {
                        SetCheckResults(true)
                        ClickToCheckRes()
                    }}>Посчитать результат</button>}
                </SwiperSlide>

            </Swiper>}

        </Container>

        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", minHeight: "500px",flexFlow: 'column' }}>
            
            {CheckResults && <AnimatePresence key={"dwadawd"}>
                <motion.p initial={{  opacity: 0 }} className="text_win">{Stars >= 3 ? "Супер!!!" : Stars >= 2 ? "Отлично!!!" : "Хорошо!!!"}</motion.p>
                <div className="final_res" style={{ display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <motion.div key={1} initial={{  opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { delay: 0.25 } }}
                        exit={{ opacity: 0 }}>
                        <FaStar className={Stars >= 1 ? "star golden" : "star "} />
                    </motion.div>
                    <motion.div key={2} initial={{  opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { delay: 0.75 } }}
                        exit={{ opacity: 0 }}>
                        <FaStar className={Stars >= 3 ? "middle_star golden" : "middle_star "} />
                    </motion.div>
                    <motion.div key={3} initial={{  opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { delay: 0.5 } }}
                        exit={{ opacity: 0 }}>
                        <FaStar className={Stars >= 2 ? "star golden" : "star "} />
                    </motion.div>
                </div>
                <Link to="/"><motion.button   initial={{  opacity: 0 }} animate={{  opacity: 1, transition: { delay: 1 } }} exit={{ opacity: 0 }} className="nextQuestion">Вернуться</motion.button></Link>
            </AnimatePresence>}
        </div>
    </main>)
}