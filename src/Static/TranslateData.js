import { JP, RU, US } from "country-flag-icons/react/3x2";

export const TData =[
    {
        siteTitle: "МирОткрытий",
        lang: "RU",
        levels: [{
            name: "1 Уровень",
            path: "1"
        },{
            name: "2 Уровень",
            path: "2"
        },{
            name: "3 Уровень",
            path: "3"
        }],
        menu: [{
            name: "Уровни"
        },
        {
            name: "Интерактивные игры"
        }],
        flag: <RU className='flag_style'/>
    },
    {
        siteTitle: "TheWorldofDiscoveries",
        lang: "US",
        levels: [{
            name: "1 Level",
            path: "1"
        },{
            name: "2 Level",
            path: "2"
        },{
            name: "3 Level",
            path: "3"
        }],
        menu: [{
            name: "Levels"
        },
        {
            name: "Interactive games"
        }],
        flag: <US className='flag_style'/>
    },
    {
        siteTitle: "発見の世界",
        lang: "JP",
        levels: [{
            name: "1 レベル",
            path: "1"
        },{
            name: "2 レベル",
            path: "2"
        },{
            name: "3 レベル",
            path: "3"
        }],
        menu: [{
            name: "レベル"
        },
        {
            name: "インタラクティブゲーム"
        }],
        flag: <JP className='flag_style'/>
    },
]