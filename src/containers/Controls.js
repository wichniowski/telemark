import React, { Component } from "react";
import { connect } from "react-redux";
import { addSynth } from "../redux/modules/telemark";
import Recorder from "./Recorder";
import RangeSliderWithLabel from "../components/RangeSliderWithLabel";
import styles from "./Controls.scss";

class Controls extends Component {
  render() {
    const { addSynth, mainOut } = this.props;
    return (
      <div className={styles.container}>
        <button
          className={styles.plusButton}
          onClick={() => {
            addSynth();
          }}
        >
          +
        </button>
        <div className={styles.controllerContainer}>
          <div className={styles.mainVolumeWrapper}>
            <RangeSliderWithLabel
              onChange={e => {
                mainOut.gain.value = e.target.value;
              }}
              min={0}
              step={0.01}
              max={0.5}
            />
          </div>
          <Recorder />
          <span className={styles.divider}>|</span>
          <a href="../radio" className={styles.radioLink}>
            ⨳
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mainOut: state.telemark.mainOut
});

const mapDispatchToProps = dispatch => ({
  addSynth: () => {
    dispatch(addSynth());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
