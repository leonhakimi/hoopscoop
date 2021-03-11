import React, { Component } from "react";
import { connect } from "react-redux";
import AsyncSelect from "react-select/async";
import _ from "lodash";
import * as actions from "../actions";

function hashCode(str) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function pickColor(str) {
  return `hsl(${hashCode(str) % 360}, 100%, 80%)`;
}

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
  valueContainer: (provided, state) => ({
    ...provided,
    height: '50px',
    backgroundColor: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    margin: '0',
    color: state.isSelected ? "red" : "black",
  }),
  control: (styles) => ({ ...styles, border: '0', backgroundColor: "black", color: 'black' }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: pickColor(data.label),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: 'white',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    color: 'red',
    backgroundColor: 'white'
  })
};

class Select extends Component {
 
  render() {
    return (
      <div style={{ position: "fixed", width: "100%", zIndex: "1000" }}>
        <AsyncSelect
          placeholder="Search"
          isMulti
          cacheOptions
          defaultValue={this.props.defaultValue}
          loadOptions={loadOptions}
          onChange={(e) => {
            this.props.updatePlayers(e);
            this.props.updateDate(this.props.date, e);
          }}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: '0',
            colors: {
              ...theme.colors,
              primary25: "red",
              primary: "black",
            },
          })}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    date: state.dateSelection
  }
}

export default connect(mapStateToProps, actions)(Select);
