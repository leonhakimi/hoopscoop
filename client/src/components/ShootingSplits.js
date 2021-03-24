import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

class ShootingSplits extends React.Component {
  render() {
    const renderStats = () => {
      return (
        <div>
          <div className="col">
            <div className="card">
              <div
                className={`card-content ${
                  this.props.totals.fgm.A / this.props.totals.fga.A >
                  this.props.totals.fgm.B / this.props.totals.fga.B
                    ? "red"
                    : "blue"
                }`}
              >
                <span className="card-title black-text">FG%</span>
                <span className="black-text">
                  {round(
                    (this.props.totals.fgm.A / this.props.totals.fga.A) * 100,
                    2
                  )}
                  % vs{" "}
                  {round(
                    (this.props.totals.fgm.B / this.props.totals.fga.B) * 100,
                    2
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div
                className={`card-content ${
                  this.props.totals.fg3m.A / this.props.totals.fg3a.A >
                  this.props.totals.fg3m.B / this.props.totals.fg3a.B
                    ? "red"
                    : "blue"
                }`}
              >
                <span className="card-title black-text">3FG%</span>
                <span className="black-text">
                  {round(
                    (this.props.totals.fg3m.A / this.props.totals.fg3a.A) * 100,
                    2
                  )}
                  % vs{" "}
                  {round(
                    (this.props.totals.fg3m.B / this.props.totals.fg3a.B) * 100,
                    2
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div
                className={`card-content ${
                  this.props.totals.ftm.A / this.props.totals.fta.A >
                  this.props.totals.ftm.B / this.props.totals.fta.B
                    ? "red"
                    : "blue"
                }`}
              >
                <span className="card-title black-text">FT%</span>
                <span className="black-text">
                  {round(
                    (this.props.totals.ftm.A / this.props.totals.fta.A) * 100,
                    2
                  )}
                  % vs{" "}
                  {round(
                    (this.props.totals.ftm.B / this.props.totals.fta.B) * 100,
                    2
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="comparison_container">
        <h3 className="comparison_header">Shooting Splits</h3>
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

export default connect(mapStateToProps, actions)(ShootingSplits);
