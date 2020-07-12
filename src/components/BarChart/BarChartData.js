import React, { useState } from "react";
import { range } from "d3-array";
import BarChart from "./BarChart";

function BarChartData() {
    const generateData = (value, length = 8) =>
        range(length).map((item, index) => ({
            index: index,
            date: index,
            value: value === null || value === undefined ? Math.random() * 100 : value
        }));

    const [data, setData] = useState(generateData());

    return (
        <BarChart
            data={data}
            width={300}
            height={200}
            top={20}
            bottom={30}
            left={30}
            right={0}
        />
    );
}

export default BarChartData;