import React, { useEffect, useState } from 'react'
import card from '../Components/card.module.css';
import backArrow from '../assets/images/back-arrow.png';
import powerSwitch from '../assets/images/switch.png';
import minusIcon from '../assets/images/minus.png';
import plusIcon from '../assets/images/plus.png';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios'


// Interface for type casting
export interface IStationPlaceHolderData {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};
export interface IStationPropData {
    id: number;
    title: string;
    thumbnailUrl?: string;
};
export default function Card() {
    // Data from JSON file
    let jsonPlaceHolderurl = "stations.json";

    // Data from API url 
    // let jsonPlaceHolderurl = "https://jsonplaceholder.typicode.com/photos";

    // storing retrived data in local state 
    const [data, setData] = useState<IStationPlaceHolderData[]>([]);
    
    // storing selected item data in local state 
    const [propsData, setPropsData] = useState<IStationPropData[]>([{
        id: 0,
        title: '',
        thumbnailUrl: '',
    }])

    // I want to load data when component is loading
    useEffect(() => {
        axios.get<IStationPlaceHolderData[]>(jsonPlaceHolderurl)
            .then(({ data }) => {
                setData(data)
            })
    }, [])

    return (
        <Router>
            <div className={`${card.cardWraper} ${card.flexCol}`}>
                <div className={`${card.card}`}>
                    <div className={`${card.cardHeader} ${card.flexRow}`}>
                        <div className={card.backArrow}>
                            <Link to="/">
                                <img src={backArrow} alt="back-arrow" />
                            </Link>
                        </div>
                        <div className={card.appTitle}>
                            STATIONS
                        </div>
                        <div className={card.backArrow}>
                            <Link to="/">
                                <img src={powerSwitch} alt="back-arrow" />
                            </Link>
                        </div>
                    </div>

                    <div className={`${card.cardBody} ${card.flexCol}`}>
                        <div className={`${card.flexCol} ${card.flexSpaceBetween} ${card.borderBottom}`}>
                            {propsData.map(station =>
                                station.id ?
                                    <div key={station.id} className={`${card.flexRow} ${card.flexSpaceBetween}`}>
                                        <div>
                                            <Link to="/">
                                                <img src={minusIcon} alt="minus-icon" />
                                            </Link>
                                        </div>
                                        {station.thumbnailUrl ?
                                            <div>
                                                <img src={station.thumbnailUrl} alt="station-logo" />
                                            </div>
                                            : ''}
                                        <div>
                                            <Link to="/">
                                                <img src={plusIcon} alt="plus-icon" />
                                            </Link>
                                        </div>
                                    </div>
                                    : '')}

                            {data.map(station =>
                                station ?
                                    <div key={station.id} onClick={() => setPropsData([{ title: station.title, thumbnailUrl: station.thumbnailUrl, id: station.id }])} className={`${card.flexRow} ${card.flexSpaceBetween} ${card.cardBodyItem}`}>
                                        <div>
                                            {station.title}
                                        </div>
                                        <div>
                                            {station.albumId}
                                        </div>
                                    </div>
                                    : '')}
                        </div>
                    </div>
                    {propsData.map((station, index) =>
                        station ?
                            <div key={station.id} className={`${card.cardFooter} ${card.flexCol}`}>
                                <div className={card.footerSubTitle}>
                                    <>
                                        {station.id ? <p>CURRENTLY PLAYING</p> : ''}
                                        <h2>{station.title}</h2>
                                    </>
                                </div>
                            </div> : '')}
                </div>
            </div>
        </Router>
    )
}
