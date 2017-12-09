import React, { Component } from "react";
import { connect } from "react-redux";
import Tag from "../components/Tag";
import styles from "./Overlay.scss";
import { setStart } from "../redux/modules/telemark";

class Overlay extends Component {
  state = {
    closed: false
  };

  close = () => {
    this.setState({
      closed: true
    });

    this.props.setStart();
  };

  render() {
    return (
      <div>
        {this.state.closed ? null : (
          <div className={styles.overlay}>
            <div className={styles.outerWrapper}>
              <div className={styles.innerWrapper}>
                <h1>Welcome to Telemark</h1>
                <p style={{ fontWeight: 100 }}>
                  Telemark is an instrument to generate and listen to endless
                  hours of drones and noises. Start by setting up a synth rack
                  adding as many oscillators your browser can handle and explore
                  the sonic universe of low frequency oscillation, waveshaping
                  and reverb. If you found the right setting hit the red dot on
                  the top right to record your drone. Hit it one more time to
                  stop your recording and head over to the radio to listen to
                  your and all other drones created with Telemark.
                </p>
                <div style={{ marginTop: 50 }}>
                  <a className={styles.cta} href="#" onClick={this.close}>
                    Start Telemark
                  </a>
                  <a className={styles.cta} href="../radio">
                    Go to Radio
                  </a>
                </div>
                <Tag />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setStart: () => {
    dispatch(setStart());
  }
});

export default connect(null, mapDispatchToProps)(Overlay);
