import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { endOfDay } from "date-fns";

// function hashCode(str) {
//   let hash = 0;
//   for (var i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   return hash;
// }

// function pickColor(str) {
//   return `hsl(${hashCode(str) % 360}, 100%, 80%)`;
// }

class Scatter extends React.Component {
  componentDidMount() {
    const xAxis = d3.axisBottom().ticks(6).scale(this.props.xScale);
    const yAxis = d3.axisLeft().scale(this.props.yScale);
    d3.select("#Scatter-Xaxis").call(xAxis);
    d3.select("#Scatter-Yaxis").call(yAxis);
  }

  componentDidUpdate() {
    const xAxis = d3.axisBottom().ticks(6).scale(this.props.xScale);
    const yAxis = d3.axisLeft().scale(this.props.yScale);
    d3.select("#Scatter-Xaxis").call(xAxis);
    d3.select("#Scatter-Yaxis").call(yAxis);
  }
  render() {
    const drawScatter = (category) => {
      return this.props.stats.map((performance) => (
        <circle
          key={performance.id}
          style={{ fill: `${performance.playerId === this.props.playerRed.value ? 'red' : 'blue'}` }}
          cx={this.props.xScale(endOfDay(new Date(performance.date)))}
          cy={this.props.yScale(performance[category])}
          r="4"
        >
          <title>{`${performance.name}: ${performance[category]} ${category}, ${performance.date}`}</title>
        </circle>
      ));
    };

    // const drawTooltip = (category) => {
    //   return this.props.stats.map((player) => (
    //     <rect
    //       x={this.props.xScale(endOfDay(new Date(player.date)))}
    //       y={this.props.yScale(player[category])}
    //       width="20"
    //       height="20"
    //       className="tooltip"
    //       onMouseOver={(e) => {
    //         console.log(e);
    //       }}
    //     ></rect>
    //   ));
    // };

    return (
      <svg className="scatterTimeline card" width={1200} height={400}>
        {drawScatter(this.props.category)}
        <g
          id="Scatter-Xaxis"
          className="axis"
          transform={`translate(0, ${400 - 30})`}
        ></g>
        <g
          id="Scatter-Yaxis"
          className="axis"
          transform={"translate(30, 0)"}
        ></g>
      </svg>
    );
  }
}
function mapStateToProps(state) {
  return {
    stats: state.stats,
    category: state.category,
    playerRed: state.playerRed,
  };
}

export default connect(mapStateToProps, {})(Scatter);
