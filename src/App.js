import React from "react";

import PieChartData from "./components/PieChart/PieChartData";
import BarChartData from "./components/BarChart/BarChartData";
import RacingBarChartData from "./components/RacingBarChart/RacingBarChartData";

import Header from "./layout/Header";


import './App.css';

function App() {

    return (
        <div>

            <Header />
            <div className="flex-container" >
                <div className={'Chart'}>
                    <PieChartData />
                </div>
                <RacingBarChartData />
                <div className={'Chart'}>
                    <BarChartData />
                </div>

            </div>
        </div>
    );
}

export default App;