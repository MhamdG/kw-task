import React, { useState } from "react";
import {range} from "d3-array";
import PieChart from "./PieChart";

function PieChartData() {
    
    const generateData = (value, length = 9) =>
        range(length).map((item, index) => ({
            index: index,
            date: index,
            value: value === null || value === undefined ? Math.floor(Math.random() * (30 - 5 + 1)) + 8 : value
        }));

    const [data, setData] = useState(generateData());

    return (
        <PieChart
            data={data}
            width={200}
            height={200}
            innerRadius={33}
            outerRadius={100}
        />
    );
}

export default PieChartData;
