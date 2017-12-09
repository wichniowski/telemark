import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import smoothScroll from "smoothscroll";
import cx from "classnames";
import Oscillator from "../DSP/Synth";
import WaveformSelect from "../components/WaveformSelect";
import Piano from "../components/Piano";
import Slider from "../components/Slider";
import FilterTypeSelect from "../components/FilterTypeSelect";
import styles from "./Synth.scss";

class Synth extends Component {
  constructor(props) {
    super(props);

    this.oscillator = new Oscillator(props.audioContext, props.mainOut);
    this.startSequencer = this.startSequencer.bind(this);
    this.setFrequency = this.setFrequency.bind(this);
    this.setLFOFrequency = this.setLFOFrequency.bind(this);
  }

  componentDidMount() {
    smoothScroll(this.domNode);
  }

  setFrequency(event) {
    this.oscillator.setFrequency(event.target.value);
  }

  setLFOFrequency(event) {
    this.oscillator.setLFOFrequency(event.target.value);
  }

  startSequencer() {
    this.oscillator.startSequencer();
  }

  render() {
    return (
      <div className={styles.wrapper} ref={ref => (this.domNode = ref)}>
        <div
          className={cx(
            styles.container,
            this.props.appStarted && styles.active
          )}
        >
          <Piano
            onChange={freq => {
              this.oscillator.setFrequency(freq);
            }}
          />
          <WaveformSelect
            label="Main Waveform"
            onChange={value => this.oscillator.setOSCType(value)}
            opaqIndex={0}
          />
          <Slider
            label="lfo freq"
            max={100}
            onChange={value => {
              this.oscillator.setLFOFrequency(value);
            }}
            opaqIndex={0.1}
            reverse
          />
          <Slider
            label="Reverb Dry/Wet"
            max={1}
            onChange={value => this.oscillator.setReverbTryWet(value)}
            opaqIndex={0.2}
            reverse
          />
          <FilterTypeSelect
            onChange={type => this.oscillator.setFilterType(type)}
          />
          <Slider
            label="Filter Freq"
            max={22000}
            onChange={value => this.oscillator.setFilterFrequency(value)}
            opaqIndex={0.3}
          />
          {/* <Slider
            label="Filter Type"
            max={100}
            onChange={(value) => this.oscillator.setFilterType(value)}
            opaqIndex={0.4}
            reverse
          /> */}
          <Slider
            label="Filter LFO"
            max={2000}
            onChange={value => this.oscillator.setFilterLFOFrequency(value)}
            opaqIndex={0.4}
            reverse
          />
          <Slider
            label="Wave Shaping"
            max={900}
            onChange={value => this.oscillator.setDistortion(value)}
            opaqIndex={0.5}
            reverse
          />
          <Slider
            label="SpatialX"
            max={1}
            onChange={value => this.oscillator.changePan(value)}
            opaqIndex={0.6}
          />
          <Slider
            label="Volume"
            max={0.6}
            onChange={value => this.oscillator.setMasterVolume(value)}
            opaqIndex={0.7}
          />
        </div>
      </div>
    );
  }
}

Synth.propTypes = {
  waveform: PropTypes.oneOf(["saw", "sine", "triangle", "noise"]),
  frequency: PropTypes.number,
  lfo: PropTypes.bool,
  lfoFrequency: PropTypes.number,
  volume: PropTypes.number,
  reverb: PropTypes.bool,
  delay: PropTypes.bool
};

const mapStateToProps = state => ({
  ...state.telemark
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Synth);
