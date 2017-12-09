import React, { Component } from "react";
import cx from "classnames";
import firebase from "../firebase";
import sanitizer from "sanitizer";
import Tag from "../components/Tag";
import styles from "./Radio.scss";

class Radio extends Component {
  state = {
    tracks: [],
    playing: false,
    currentlyPlaying: new Audio("url"),
    currentTrackIndex: 0,
    radioStarted: false
  };

  audioPlayer = new Audio("");

  componentDidMount() {
    const storageRef = firebase.storage().ref();
    return firebase
      .database()
      .ref("/recordings")
      .once("value")
      .then(snapshot => {
        const allRecordings = snapshot.val();
        Object.keys(allRecordings).forEach(key => {
          storageRef
            .child("recordings/" + allRecordings[key].fileName)
            .getDownloadURL()
            .then(url => {
              this.setState(
                {
                  tracks: [
                    ...this.state.tracks,
                    {
                      title: allRecordings[key].fileName,
                      url
                    }
                  ]
                },
                () => {
                  if (this.state.tracks.length === 1) {
                    //this.startRadio();
                  }
                }
              );
            });
        });
      });
  }

  startRadio = () => {
    this.playTrack(this.state.tracks[0].url);
    this.audioPlayer.addEventListener("ended", () => {
      this.setState(
        {
          currentTrackIndex:
            this.state.currentTrackIndex === this.state.tracks.length - 1
              ? 0
              : this.state.currentTrackIndex + 1,
          playing: true,
          radioStarted: true
        },
        () => {
          this.playTrack(this.state.tracks[this.state.currentTrackIndex].url);
        }
      );
    });
  };

  stopRadio = () => {
    this.setState(
      {
        playing: false
      },
      () => {
        this.audioPlayer.pause();
      }
    );
  };

  playTrack = url => {
    this.audioPlayer.src = url;
    this.audioPlayer.load();
    this.audioPlayer.play();
    this.setState({
      playing: true
    });
  };

  handlePlayAction = () => {
    if (!this.state.radioStarted) {
      this.startRadio();
    }
    if (this.state.playing) {
      this.audioPlayer.pause();
    } else {
      this.audioPlayer.play();
    }

    this.setState({
      playing: !this.state.playing
    });
  };

  render() {
    return (
      <div className={styles.radioWrapper}>
        <div className={styles.tracklistWrapper}>
          {!this.state.tracks ? (
            <p>loading...</p>
          ) : (
            <ul className={styles.trackList}>
              {this.state.tracks.map((track, index) => (
                <li
                  className={cx(
                    this.state.currentTrackIndex === index
                      ? styles.active
                      : null,
                    styles.track
                  )}
                  key={index}
                >
                  <button
                    onClick={() => {
                      this.setState(
                        {
                          currentTrackIndex: index
                        },
                        () => {
                          this.playTrack(track.url);
                        }
                      );
                    }}
                  >
                    {sanitizer.escape(track.title).replace(".mp4", "")}
                  </button>
                  <a href={sanitizer.escape(track.url)} download>
                    download
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.aboutWrapper}>
          <div className={styles.about}>
            <h1>Radio</h1>
            <button
              className={styles.playButton}
              onClick={this.handlePlayAction}
            >
              {this.state.playing ? "stop" : "play"}
            </button>
            <p>
              This is a repository of tracks created with Telemark. Every
              recorded track gets a random two-word title. No Artist names will
              be published nor will you know which track is yours until you hear
              it. Press the play button or a track to start the Radio. You can
              contribute to this repository by visiting telemark.io.
              <br />
              <br />
              Thank you for visiting!
              <Tag />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Radio;
