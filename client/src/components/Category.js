import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Select from "react-select";

const options = [
  { label: "ESPN Fantasy Points", value: "fp" },
  { label: "pts", value: "pts" },
  { label: "ast", value: "ast" },
  { label: "reb", value: "reb" },
  { label: "blk", value: "blk" },
  { label: "stl", value: "stl" },
  { label: "tov", value: "tov" },
];

const customStyles = {
  valueContainer: (provided, state) => ({
    ...provided,
    height: "50px",
    backgroundColor: "red",
  }),
  option: (provided, state) => ({
    ...provided,
    margin: "0",
    color: state.isSelected ? "red" : "black",
    zIndex: '1000'
  }),
  control: (styles) => ({
    ...styles,
    border: "0",
    backgroundColor: "black",
    color: "black",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    color: "red",
    backgroundColor: "red",
  }),
};

class Category extends React.Component {
  render() {
    return (
      <div
        className="category"
        style={{ maxWidth: "300px", marginTop: "100px", zIndex: "1000" }}
      >
        <Select
          // onClick={() => {
          //   this.props.updateCategory("pts");
          // }}
          className="basic-single"
          classNamePrefix="select"
          defaultValue={options[0]}
          name="color"
          options={options}
          onChange={(e) => {
            this.props.updateCategory(e.value);
          }}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: "0",
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

export default connect(null, actions)(Category);
