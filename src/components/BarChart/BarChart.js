import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { scaleOrdinal,scaleBand,scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { format as d3format } from "d3-format";
import { select } from "d3-selection";
import { schemeCategory10 } from "d3-scale-chromatic";
import { axisBottom, axisLeft } from "d3-axis";
import { interpolate } from "d3-interpolate";



const colors = scaleOrdinal(schemeCategory10);
const animationDuration = 150;
const animationConfig = {
    to: async (next, cancel) => {
        await next({ t: 1 });
    },
    from: { t: 0 },
    config: { duration: animationDuration },
    reset: true
};

const XAxis = ({ top, bottom, left, right, height, scale }) => {
    const axis = useRef(null);

    useEffect(() => {
        select(axis.current)
            .transition()
            .duration(animationDuration)
            .call(axisBottom(scale));
    });

    return (
        <g
            className="axis x"
            ref={axis}
            transform={`translate(${left}, ${height - bottom})`}
        />
    );
};

const YAxis = ({ top, bottom, left, right, scale }) => {
    const axis = useRef(null);

    useEffect(() => {
        select(axis.current)
            .transition()
            .duration(animationDuration)
            .call(axisLeft(scale));
    });

    return (
        <g className="axis y" ref={axis} transform={`translate(${left}, ${top})`} />
    );
};

const Rect = ({ index, data, prev, next, x, y, height, top, bottom, sort }) => {
    const [animatedProps, setAnimatedProps] = useSpring(() => animationConfig);
    setAnimatedProps(animationConfig);

    const prevIndex = prev.findIndex(d => d.index === next[index].index);
    const interpolator = interpolate(prev[index], data);
    const shouldUpdate =
        !sort &&
        prev[index].index === data.index &&
        prev[index].value !== data.value;

    const interpolatorX = interpolate(
        x(sort ? prevIndex : prevIndex),
        x(sort ? data.index : data.index)
    );

    const interpolatorY = interpolate(
        y(shouldUpdate ? prev[index].value : data.value),
        y(data.value)
    );

    return (
        <animated.g
            key={data.index}
            transform={animatedProps.t.interpolate(t => {
                return `translate(${interpolatorX(t)}, ${interpolatorY(t)})`;
            })}
        >
            <animated.rect
                width={x.bandwidth()}
                height={animatedProps.t.interpolate(t => {
                    return height - bottom - top - interpolatorY(t);
                })}
                fill={colors(data.index)}
            />
            <animated.text
                transform={`translate(${x.bandwidth() / 2}, ${-4})`}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="grey"
                fontSize="10"
            >
                {shouldUpdate
                    ? animatedProps.t.interpolate(t => d3format(interpolator(t).value))
                    : d3format(data.value)}
            </animated.text>
        </animated.g>
    );
};

const BarChart = props => {
    const cache = useRef(props.data);
    const data = useRef(props.data);
    let [sort, setSort] = useState(null);
    [sort, setSort] = useState(() => {
        cache.current = props.data;
        return sort ? !sort : false;
    });

    data.current = sort
        ? [...props.data].sort((a, b) => b.value - a.value)
        : [...props.data];

    const x =         scaleBand()
        .range([0, props.width - props.left - props.right])
        .domain(data.current.map(d => d.date))
        .padding(0.1);

    const y = scaleLinear()
        .range([props.height - props.top - props.bottom, 0])
        .domain([0, max(data.current, d => d.value)]);

    useEffect(() => {
        cache.current = data.current;
    });

    return (
        <>
            <svg onClick={() => {
                setSort(!sort);
            }} width={props.width} height={props.height}>
                <XAxis
                    scale={x}
                    top={props.top}
                    bottom={props.bottom}
                    left={props.left}
                    right={props.right}
                    height={props.height}
                />
                <YAxis
                    scale={y}
                    top={props.top}
                    bottom={props.bottom}
                    left={props.left}
                    right={props.right}
                />
                <g transform={`translate(${props.left}, ${props.top})`}>
                    {props.data.map((d, i) => (
                        <Rect
                            key={i}
                            index={i}
                            data={d}
                            prev={cache.current}
                            next={data.current}
                            x={x}
                            y={y}
                            top={props.top}
                            bottom={props.bottom}
                            height={props.height}
                            sort={sort}
                        />
                    ))}
                </g>
            </svg>
        </>
    );
};

export default BarChart;
