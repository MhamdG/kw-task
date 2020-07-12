import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "./useResizeObserver";

function RacingBarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    data.sort((a, b) => b.value - a.value);

    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((value, index) => index))
      .range([0, dimensions.height]); 

    const xScale = scaleLinear()
      .domain([0, max(data, entry => entry.value)]) 
      .range([0, dimensions.width]); 

    svg
      .selectAll(".bar")
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("fill", entry => entry.color)
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("width", entry => xScale(entry.value))
      .attr("y", (entry, index) => yScale(index));

    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter
          .append("text")
          .attr(
            "y",
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .text(entry => `${entry.name} (${entry.value} Value)`)
      .attr("class", "label")
      .attr("x", 10)
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RacingBarChart;
