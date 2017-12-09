import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Slider.scss";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbWidth: "100%",
      locked: true
    };

    this.getPercentageByMaxValue = this.getPercentageByMaxValue.bind(this);
  }

  getPercentageByMaxValue(percent) {
    return this.props.max / 100 * percent;
  }

  setPercentage = (event, direct) => {
    if (this.state.locked && !direct) {
      return;
    }

    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const percent = 100 * x / event.currentTarget.offsetWidth;

    this.props.onChange(
      this.getPercentageByMaxValue(this.props.reverse ? 100 - percent : percent)
    );
    this.setState({ thumbWidth: `${percent}%` });
  };

  render() {
    const { opaqIndex } = this.props;
    return (
      <div className={styles.container}>
        <div
          className={styles.track}
          onMouseMove={event => this.setPercentage(event, false)}
          onClick={event => this.setPercentage(event, true)}
          onMouseDown={() => this.setState({ locked: false })}
          onMouseUp={() => this.setState({ locked: true })}
          onMouseLeave={() => this.setState({ locked: true })}
        >
          <div
            className={styles.thumb}
            style={{ width: this.state.thumbWidth }}
          >
            <div className={styles.whiteLayer} style={{ opacity: opaqIndex }} />
          </div>
        </div>
      </div>
    );
  }
}

Slider.defaultProps = {
  onChange: value => {},
  max: 100,
  label: "slider",
  opaqIndex: 0
};

Slider.propTypes = {
  onChange: PropTypes.func,
  max: PropTypes.number,
  opaqIndex: PropTypes.number
};

export default Slider;
