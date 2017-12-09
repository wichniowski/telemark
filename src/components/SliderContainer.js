import React from "react";
import PropTypes from "prop-types";
import styles from "./Waveform.scss";

const SliderContainer = ({ children }) => (
  <div className={styles.sliderContainer}>{children}</div>
);

SliderContainer.propTypes = {
  children: PropTypes.node
};

export default SliderContainer;
