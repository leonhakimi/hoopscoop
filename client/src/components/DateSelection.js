import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { connect } from "react-redux";
import * as actions from "../actions";

class DateSelection extends React.Component {
  render() {
    return (
      <div className="date">
        <Calendar
          className="card"
          selectRange
          onChange={(e) => this.props.updateStats(e, this.props.playerRed, this.props.playerBlue)}
        />
      </div>
    );
  }
}

function mapStateToProps({ dateSelection, playerRed, playerBlue }) {
  return {
    dateSelection,
    playerRed,
    playerBlue
  };
}

export default connect(mapStateToProps, actions)(DateSelection);
