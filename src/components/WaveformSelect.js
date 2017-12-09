import React, { Component } from "react";
import PropTypes from "prop-types";
import Waveform from "./Waveform";
import styles from "./WaveformSelect.scss";

class WaveformSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "osc",
      currentWaveform: "sine"
    };
  }

  render() {
    const { waveforms, onChange } = this.props;
    return (
      <div>
        <div className={styles.wrapper}>
          {waveforms.map(waveform => (
            <button
              key={waveform}
              onClick={() => {
                this.setState({
                  currentWaveform: waveform
                });
                onChange(waveform);
              }}
            >
              <Waveform
                active={this.state.currentWaveform === waveform}
                icon={waveform}
              />
            </button>
          ))}
          {/*
          <button onClick={() => {
              this.setState({
                type: this.state.type === 'osc' ? 'fil' : 'osc'
              })
            }}
          >
            <Waveform icon="noise" />
          </button>
        */}
        </div>
      </div>
    );
  }
}

WaveformSelect.defaultProps = {
  waveforms: ["sine", "sawtooth", "triangle", "square", "noise"],
  type: ["amp", "fil"]
};

WaveformSelect.propTypes = {
  waveforms: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default WaveformSelect;
