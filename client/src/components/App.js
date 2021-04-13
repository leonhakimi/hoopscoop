import React from "react";
import * as d3 from "d3";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../styles/App.css";

import Header from "./Header";
import Scatter from "./Scatter";
import Averages from "./Averages";
import Category from "./Category";
import Modal from "./Modal";
import Selector from "./Selector";
import Comparison from "./Comparison";
import ComparisonAverages from "./ComparisonAverages";
import ShootingSplits from "./ShootingSplits";

function scaleCategory(category) {
  switch (category) {
    case "fp":
      return 110;
    case "pts":
      return 81;
    default:
      return 10;
  }
}

class App extends React.Component {


  render() {
    const yScale = d3
      .scaleLinear()
      .domain([0, scaleCategory(this.props.category)])
      .range([400 - 30, 30]);

    const xScale = d3
      .scaleTime()
      .domain([new Date(this.props.date[0]), new Date(this.props.date[1])])
      .range([30, 1200 - 30]);

    return (
      <BrowserRouter>
        <Header />
        <div className="selector">
          <div className="select">
            <Selector color="red" />
          </div>
          <div className="select">
            <Selector color="blue" />
          </div>
        </div>
        {this.props.playerRed ? (
          <div>
            <Category />
            <Modal />
          </div>
        ) : (
          ""
        )}

        {this.props.stats ? <Scatter xScale={xScale} yScale={yScale} /> : ""}
        {this.props.comparison ? <div><Comparison /><ComparisonAverages /><ShootingSplits /></div> : ""}
        {this.props.averages ? <Averages /> : ""}
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    stats: state.stats,
    default: state.defaultPlayers,
    date: state.dateSelection,
    playerRed: state.playerRed,
    playerBlue: state.playerRed,
    averages: state.averages,
    category: state.category,
    comparison: state.comparison,
  };
}

export default connect(mapStateToProps, actions)(App);
