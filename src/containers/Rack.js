import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Synth from "./Synth.js";
import firebase from "../firebase";
import styles from "./Rack.scss";

class Rack extends Component {
  componentDidMount() {
    const firebaseRef = firebase.database().ref("synths/");
    firebaseRef.on("value", snapshot => {
      // console.log('snapshot', snapshot.val());
    });
  }

  render() {
    const { synths, synthAmount } = this.props;
    return (
      <div className={styles.container}>
        {synths.map(synth => <Synth key={synth.id} id={synth.id} />)}
        <p className={styles.synthAmount}>{synthAmount}</p>
      </div>
    );
  }
}

Rack.propTypes = {
  synths: PropTypes.array,
  synthAmount: PropTypes.number
};

const mapStateToProps = state => ({
  synths: state.telemark.synths,
  synthAmount: state.telemark.synthAmount
});

export default connect(mapStateToProps)(Rack);
