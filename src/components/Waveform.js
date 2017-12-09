import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Waveform.scss";

const Waveform = ({ icon, active }) => (
  <div className={styles.wrapper}>
    <div className={cx(active && styles.active, styles.icon, styles[icon])} />
  </div>
);

Waveform.propTypes = {
  icon: PropTypes.oneOf(["sine", "sawtooth", "triangle", "square", "noise"])
};

export default Waveform;
