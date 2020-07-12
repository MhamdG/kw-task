import React, { useState } from "react";
import RacingBarChart from "./RacingBarChart";
import useInterval from "./useInterval";

const getRandomIndex = array => {
    return Math.floor(array.length * Math.random());
};

const getRandomnumber = () => {
   return Math.floor(Math.random() * (20 - 10 + 1)) + 10;
};

function RacingBarChartData() {

    const [iteration, setIteration] = useState(0);
    const [start, setStart] = useState(false);
    const [data, setData] = useState([{
        name: "A",
        value: 10,
        color: "#f4efd3"
    },
    {
        name: "B",
        value: 15,
        color: "#cccccc"
    },
    {
        name: "C",
        value: 20,
        color: "#c2b0c9"
    },
    {
        name: "D",
        value: 25,
        color: "#9656a1"
    },
    {
        name: "E",
        value: 30,
        color: "#fa697c"
    },
    {
        name: "F",
        value: 35,
        color: "#fcc169"
    }
    ]);

    useInterval(() => {
        if (start) {
            const randomIndex = getRandomIndex(data);
            setData(
                data.map((entry, index) =>
                    index === randomIndex ?
                        {
                            ...entry,
                            value: entry.value + getRandomnumber()
                        } :
                        entry
                )
            );
            setIteration(iteration + 1);
        }
    }, 300);

    return (
        <div className={'Chart'}>
            <RacingBarChart data={data} />
            < button onClick={() => setStart(!start)} > {start ? "Stop" : "Run"}
            </button>
        </div>

    );
}

export default RacingBarChartData;