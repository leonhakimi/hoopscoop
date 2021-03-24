import React, { Component } from "react";
import { connect } from "react-redux";
import AsyncSelect from "react-select/async";
import _ from "lodash";
import * as actions from "../actions";

const mapOptions = ({ data }) => {
  return data.map((option) => ({
    value: option.id,
    label: `${option.first_name} ${option.last_name}`,
  }));
};

const loadOptions = _.debounce((inputValue, callback) => {
  if (!inputValue) {
    return callback([]);
  }
  const fetchURL = `https://www.balldontlie.io/api/v1/players?search=${inputValue}`;
  fetch(fetchURL).then((response) => {
    response.json().then((data) => {
      callback(mapOptions(data));
    });
  });
}, 500);

const customStyles = {
  valueContainer: (provided, { selectProps: { color } }) => ({
    ...provided,
    height: "50px",
    backgroundColor: color,
  }),

  singleValue: (styles) => {
    return {
      ...styles,
      color: "white",
    };
  },
  placeholder: (styles) => {
    return {
      ...styles,
      color: "white",
    };
  },
  indicatorsContainer: (provided, { selectProps: { color } }) => ({
    ...provided,
    backgroundColor: color,
  }),
  option: (provided, { selectProps: { color } }) => ({
    ...provided,
    color: color === "blue" ? "white" : "",
  }),
  input: (provided) => ({
    color: "white",
  }),
  menu: (styles, { selectProps: { color } }) => {
    return {
      ...styles,
      color: "white",
      backgroundColor: color,
    };
  },
};

class Select extends Component {
  render() {
    return (
      <div style={{ position: "fixed", width: "50%", zIndex: "1000" }}>
        <AsyncSelect
          color={this.props.color}
          placeholder="Search"
          cacheOptions
          loadOptions={loadOptions}
          onChange={(e) => {
            this.props.updatePlayers(e, this.props.color);
            this.props.color === "red"
              ? this.props.updateStats(
                  this.props.date,
                  e,
                  this.props.playerBlue
                )
              : this.props.updateStats(
                  this.props.date,
                  this.props.playerRed,
                  e
                );
          }}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "black",
              primary: "black",
            },
          })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    date: state.dateSelection,
    playerRed: state.playerRed,
    playerBlue: state.playerBlue,
  };
}

export default connect(mapStateToProps, actions)(Select);
