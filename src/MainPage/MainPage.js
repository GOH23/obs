import Container from "react-bootstrap/esm/Container";
import LevelCard from "../Components/CardBox";
import "./../Styles/pages/main_page.css"
import { useContext } from "react";
import { TranslateContext } from "../Static/TranslateContext";
import { TData } from "../Static/TranslateData";

export default function MainPage() {
    var {Lang,LevelsData} = useContext(TranslateContext)
    return (<Container>
        <Container>
            <div className="container_levels">
                <LevelCard link={"/level/1"} data={TData.filter((m)=>m.lang == Lang)[0].levels[0]} stars={LevelsData?.filter((el)=>el.levelID == 1)[0]?.Star}/>
                <LevelCard link={"/level/2"} data={TData.filter((m)=>m.lang == Lang)[0].levels[1]} stars={LevelsData?.filter((el)=>el.levelID == 2)[0]?.Star}/>
                <LevelCard link={"/level/3"} data={TData.filter((m)=>m.lang == Lang)[0].levels[2]} stars={LevelsData?.filter((el)=>el.levelID == 3)[0]?.Star}/>
            </div>
        </Container>
    </Container>)
}