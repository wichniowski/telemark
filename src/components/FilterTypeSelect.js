import React, { Component } from "react";
import styles from "./FilterTypeSelect.css";

class FilterTypeSelect extends Component {
  state = {
    activeType: "lowpass"
  };
  render() {
    return (
      <div className={styles.container}>
        <button
          className={this.state.activeType === "lowpass" && styles.active}
          onClick={() => {
            this.setState({ activeType: "lowpass" });
            this.props.onChange("lowpass");
          }}
        />
        <button
          className={this.state.activeType === "bandpass" && styles.active}
          onClick={() => {
            this.setState({ activeType: "bandpass" });
            this.props.onChange("bandpass");
          }}
        />
        <button
          className={this.state.activeType === "highpass" && styles.active}
          onClick={() => {
            this.setState({ activeType: "highpass" });
            this.props.onChange("highpass");
          }}
        />
      </div>
    );
  }
}

export default FilterTypeSelect;
