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
          onChange={(e) => this.props.updateDate(e, this.props.selection)}
        />
      </div>
    );
  }
}

function mapStateToProps({ selection, dateSelection }) {
  return {
    selection,
    dateSelection
  };
}

export default connect(mapStateToProps, actions)(DateSelection);
