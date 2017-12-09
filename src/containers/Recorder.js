import React, { Component } from "react";
import cx from "classnames";
import AlertContainer from "react-alert";
import { startRecording, stopRecording } from "../redux/modules/telemark";
import styles from "./Recorder.scss";

class Recorder extends Component {
  state = {
    blob: false,
    recording: false,
    saving: false
  };

  alertOptions = {
    offset: 10,
    position: "top left",
    theme: "dark",
    time: 5000,
    transition: "scale"
  };

  showAlert = (message, type) => {
    this.msg.show(message, {
      time: 8000,
      type: type
    });
  };

  render() {
    return (
      <div className={styles.recorder}>
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
        {!this.state.saving ? (
          <button
            className={cx(
              styles.recordButton,
              this.state.recording && styles.armed
            )}
            onClick={() => {
              if (this.state.recording) {
                this.setState({
                  saving: !this.state.saving
                });
                stopRecording(message => {
                  this.showAlert(message);
                  this.setState({
                    recording: false,
                    saving: false
                  });
                });
              } else {
                startRecording();
              }

              this.setState({
                recording: !this.state.recording
              });
            }}
          />
        ) : (
          <p className={styles.saving}>saving...</p>
        )}
      </div>
    );
  }
}

export default Recorder;
