import { FaStar } from "react-icons/fa";
import "./../Styles/level_card.css"
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from "react";
import { Link } from "react-router-dom";
export default function LevelCard(prop) {
    const [show, setShow] = useState(false);
    return (<Link to={prop.link} className="mg_top_5" style={{textDecoration: "none",color: "gray"}}><motion.div whileHover={{ scale: 1.1,borderColor: "#0077b6",image: "http://ik.imagekit.io/ventis/prod/content/images/prodotti/13/34/133417/20181108123341578.jpg" }}  onHoverStart={() => setShow(!show)} onHoverEnd={() => setShow(!show)} className="level_card_class">
        <motion.p animate={{color: show ? "#0077b6" : "#717270"}}>{prop.data.name}</motion.p>
        <AnimatePresence>
            {show && <motion.div
                className="stars_box"
                exit={{ opacity: 0 }}>
                <motion.div animate={{ scale: 1,opacity: 1,rotate: "-360deg" }} exit={{ scale: 0,rotate: "180deg" }}><FaStar className={prop.stars >= 1 ? "star golden" : "star "} /></motion.div>
                <motion.div animate={{ scale: 1,opacity: 1,rotate: "-360deg" }} exit={{ scale: 0,rotate: "180deg" }}><FaStar className={prop.stars >= 3 ? "middle_star golden" : "middle_star "} /></motion.div>
                <motion.div animate={{ scale: 1,opacity: 1,rotate: "-360deg" }} exit={{ scale: 0,rotate: "180deg"  }}><FaStar className={prop.stars >= 2 ? "star golden" : "star "} /></motion.div>
            </motion.div>}

        </AnimatePresence>
    </motion.div></Link>)
}