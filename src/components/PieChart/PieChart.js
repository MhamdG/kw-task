import React, { createRef, Component } from "react";
import {pie,arc} from "d3-shape";
import {scaleOrdinal} from "d3-scale";
import {format} from "d3-format";
import {select} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.createPie = 
      pie()
      .value(d => d.value)
      .sort(null);
    this.createArc = 
      arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius);
    this.colors = scaleOrdinal(schemeCategory10);
    this.format = format(".2f");
  }
  componentDidMount() {
    const svg = select(this.ref.current);
    const data = this.createPie(this.props.data);
    const { width, height, innerRadius, outerRadius } = this.props;

    svg
      .attr("class", "chart")
      .attr("width", width)
      .attr("height", height);

    const group = svg
      .append("g")
      .attr("transform", `translate(${outerRadius} ${outerRadius})`);

    const groupWithEnter = group
      .selectAll("g.arc")
      .data(data)
      .enter();

    const path = groupWithEnter.append("g").attr("class", "arc");

    path
      .append("path")
      .attr("class", "arc")
      .attr("d", this.createArc)
      .attr("fill", (d, i) => this.colors(d.index));

    path
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", d => `translate(${this.createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text(d => this.format(d.value));
  }

  componentWillUpdate(nextProps, nextState) {
    const svg = select(this.ref.current);
    const data = this.createPie(nextProps.data);

    const group = svg
      .select("g")
      .selectAll("g.arc")
      .data(data);

    group.exit().remove();

    const groupWithUpdate = group
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate.append("path").merge(group.select("path.arc"));

    path
      .attr("class", "arc")
      .attr("d", this.createArc)
      .attr("fill", (d, i) => this.colors(i));

    const text = groupWithUpdate.append("text").merge(group.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", d => `translate(${this.createArc.centroid(d)})`)
      .text(d => this.format(d.value));
  }

  render() {
    return <svg ref={this.ref} />;
  }
}

export default PieChart;
