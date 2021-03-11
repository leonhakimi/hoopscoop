import React from "react";
import * as d3 from "d3";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../styles/App.css";

import Header from "./Header";
import Select from "./Select";
import Scatter from "./Scatter";
import Averages from "./Averages";
import Category from './Category';
import Modal from './Modal';


function scaleCategory(category) {
  switch (category) {
    case "fp":
      return 110
    case "pts":
      return 81
    default:
      return 10
  }
}

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

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
        <Route exact path="/" component={Select} />
        {this.props.selection ? (
          <div><Category /><Modal /></div>
        ) : (
          ""
        )}
        <Route
          exact
          path="/myteams/:id"
          render={() => <Select defaultValue={this.props.default} />}
        />
        
        {this.props.stats ? (
          <Scatter xScale={xScale} yScale={yScale} />
        ) : (
          ""
        )}
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
    selection: state.selection,
    averages: state.averages,
    category: state.category
  };
}

export default connect(mapStateToProps, actions)(App);
