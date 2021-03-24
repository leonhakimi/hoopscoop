import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

class ComparisonAverages extends React.Component {
  render() {
    const renderStats = () => {
      console.log(this.props.totals);
      return Object.keys(this.props.totals).map((category) => {
        if (
          category === "pts" ||
          category === "reb" ||
          category === "ast" ||
          category === "stl" ||
          category === "blk" 
        ) {
          return (
            <div className="col">
              <div className="card">
                <div
                  className={`card-content ${
                    this.props.totals[category]["A"] /
                      this.props.totals.gp["A"] >
                    this.props.totals[category]["B"] / this.props.totals.gp["B"]
                      ? "red"
                      : "blue"
                  }`}
                >
                  <span className="card-title black-text">{category}</span>
                  <span className="black-text">
                    {round(this.props.totals[category]["A"] /
                      this.props.totals.gp["A"], 2)}{" "}
                    vs{" "}
                    {round(this.props.totals[category]["B"] /
                      this.props.totals.gp["B"], 2)}
                  </span>
                </div>
              </div>
            </div>
          );
        } else if (category === 'tov') {
            return (
              <div className="col">
                <div className="card">
                  <div
                    className={`card-content ${
                      this.props.totals[category]["A"] /
                        this.props.totals.gp["A"] >
                      this.props.totals[category]["B"] /
                        this.props.totals.gp["B"]
                        ? "blue"
                        : "red"
                    }`}
                  >
                    <span className="card-title black-text">{category}</span>
                    <span className="black-text">
                      {round(this.props.totals[category]["A"] /
                        this.props.totals.gp["A"], 2)}{" "}
                      vs{" "}
                      {round(this.props.totals[category]["B"] /
                        this.props.totals.gp["B"], 2)}
                    </span>
                  </div>
                </div>
              </div>
            );
        } else return "";
      });
    };

    return (
      <div className="comparison_container">
        <h3 className="comparison_header">Averages</h3>
        <div className="comparison row">${renderStats()}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    playerRed: state.playerRed,
    playerBlue: state.playerBlue,
    totals: state.comparison,
  };
}

export default connect(mapStateToProps, actions)(ComparisonAverages);
