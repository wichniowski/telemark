import React, { Component } from "react";
import cx from "classnames";
import styles from "./Piano.scss";

class Piano extends Component {
  state = {
    octaveIndex: 1,
    currentFreq: 0,
    activeKeyIndex: -1,
    whiteKeys: [
      "130.81",
      "146.83",
      "164.81",
      "174.61",
      "196.00",
      "220.00",
      "246.94"
    ],
    blackKeys: ["138.59", "155.56", "185.00", "207.65", "233.08"]
  };

  changeOctave = lower => {
    if (this.state.currentOctave === 1) {
      return;
    }

    const multi = lower ? 0.5 : 2;

    this.setState(
      {
        whiteKeys: this.state.whiteKeys.map(key => key * multi),
        blackKeys: this.state.blackKeys.map(key => key * multi),
        currentFreq: this.state.currentFreq * multi
      },
      () => {
        this.props.onChange(this.state.currentFreq);
      }
    );
  };

  render() {
    const { onChange } = this.props;
    return (
      <div className={styles.container}>
        <button
          onClick={() => this.changeOctave(true)}
          className={styles.octaveButton}
        >
          ⤌
        </button>
        <div className={styles.blackKeys}>
          {this.state.blackKeys.map((freq, idx) => (
            <button
              className={
                this.state.activeKeyIndex === "b" + idx ? styles.active : null
              }
              key={`freq-${freq}`}
              onClick={() => {
                this.setState(
                  {
                    activeKeyIndex: "b" + idx,
                    currentFreq: freq
                  },
                  () => {
                    onChange(freq);
                  }
                );
              }}
            />
          ))}
        </div>
        <div className={styles.whiteKeys}>
          {this.state.whiteKeys.map((freq, idx) => (
            <button
              key={freq}
              className={
                this.state.activeKeyIndex === "w" + idx ? styles.active : null
              }
              onClick={() => {
                this.setState(
                  {
                    activeKeyIndex: "w" + idx,
                    currentFreq: freq
                  },
                  () => {
                    onChange(freq);
                  }
                );
              }}
            />
          ))}
        </div>
        <button
          onClick={() => this.changeOctave()}
          className={cx(styles.octaveButton, styles.rightButton)}
        >
          ⤍
        </button>
      </div>
    );
  }
}

export default Piano;
