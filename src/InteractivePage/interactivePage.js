import Container from "react-bootstrap/esm/Container";
import "./page.css"
import { TranslateContext } from "../Static/TranslateContext";
import { useContext, useEffect, useState } from "react";
import { intData } from "./1gameData";
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap"
import { AnimatePresence, motion } from "framer-motion"
import { TData } from "../Static/TranslateData";
export default function InteractivePage() {
    var { Lang } = useContext(TranslateContext)
    var Data = TData.filter((el)=>el.lang == Lang)[0]
    const [Completed, SetCompleted] = useState({
        state: false,
        state1: false,
        state2: false,
        state3: false
    })
    const [State,SetState ] = useState([])
    const [StateCard, SetStateCard] = useState({
        selected1: "",
        selected2: "",
        selected3: ""
    })
    var [random, SetRand] = useState([])
    useEffect(() => {
        SetRand(intData.sort(() => .5 - Math.random()).slice(0, 3))
    }, [])
    function setSelected(index, value) {
        if (index == 0) SetStateCard({ ...StateCard, selected1: value })
        if (index == 1) SetStateCard({ ...StateCard, selected2: value })
        if (index == 2) SetStateCard({ ...StateCard, selected3: value })
        SetState([StateCard.selected1,StateCard.selected2,StateCard.selected3])
    }
    function Answer() {
        var Name1 = Lang == "RU" ? random[0].name : Lang == "JP" ? random[0].nameJP : random[0].nameUS
        var Name2 = Lang == "RU" ? random[1].name : Lang == "JP" ? random[1].nameJP : random[1].nameUS
        var Name3 = Lang == "RU" ? random[2].name : Lang == "JP" ? random[2].nameJP : random[2].nameUS
        SetCompleted({ state: true, state2: StateCard.selected2 == Name2, state1: StateCard.selected1 == Name1, state3: StateCard.selected3 == Name3 })
        console.log(Completed)
    }

    return (<main>
        <Container className="main_box">

            <Row className="row_box">


                {random.map((el, ind) => {
                    return (<Col key={ind} className="box" >
                        <img src={"/images/" + el.name + ".jpg"} alt="" />
                        <Form.Select aria-label="Default select example" className="form_select" onClick={(el) => setSelected(ind, el.target.value)}>
                            <option>{Data.Select}</option>
                            {intData.map((el, ind) => {
                                return (<option key={ind} value={Lang == "RU" ? el.name : Lang == "JP" ? el.nameJP : el.nameUS}>{Lang == "RU" ? el.name : Lang == "JP" ? el.nameJP : el.nameUS}</option>)
                            })}
                        </Form.Select>
                    </Col>)
                })}
            </Row>
            <div className="flex_div">
                {!Completed.state && <motion.button whileHover={{ scale: 1.1, color: "green", borderColor: "green" }} transition={{ type: "spring", stiffness: 300 }} className="button_class" onClick={() => { Answer() }}>{Data.End}</motion.button>}
            </div>
        </Container>
        {Completed.state && <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="win_box">
                <div className="box2">
                    <p>Количество совпадений: {State.filter((el) => el).length}</p>
                    <motion.button whileHover={{ scale: 1.1, color: "green", borderColor: "green" }} transition={{ type: "spring", stiffness: 300 }} className="button_class" onClick={() => { window.location.reload() }}>{Data.Reload}</motion.button>
                </div>
            </motion.div>
        </AnimatePresence>}
    </main>)
}