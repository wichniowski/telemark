import firebase from "../../firebase";
import generate from "project-name-generator";

const SET_SYNTH = "telemark/SET_SYNTH";
const ADD_SYNTH = "telemark/ADD_SYNTH";
const SET_START = "telemark/SET_START";

const audioContext = new AudioContext();
const mainOut = audioContext.createGain();
mainOut.gain.value = 0.5;
mainOut.connect(audioContext.destination);

const mediaStream = audioContext.createMediaStreamDestination();
mainOut.connect(mediaStream);
const mediaRecorder = new MediaRecorder(mediaStream.stream);

export const startRecording = () => {
  mediaRecorder.start();
};

export const exportFile = cb => {
  const chunks = [];
  mediaRecorder.ondataavailable = function(evt) {
    chunks.push(evt.data);
  };

  mediaRecorder.onstop = function(evt) {
    const recordingTitle = generate().dashed + ".mp4";
    const blob = new Blob(chunks, { type: "audio/mp4" });
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child("recordings/" + recordingTitle);
    fileRef
      .put(blob)
      .then(function(snapshot) {
        firebase
          .database()
          .ref("recordings/")
          .push(
            {
              fileName: recordingTitle,
              userAgent: window.navigator.userAgent
            },
            error => {
              if (error) {
                cb(
                  "Sorry an error occured! Your recording can not be saved.",
                  "error"
                );
              }
              cb(
                "Your recording has been saved visit the /radio to listen to it.",
                "success"
              );
            }
          );
      })
      .catch(error => {
        cb("Sorry an error occured! Your recording can not be saved.", "error");
      });
    // FileSaver.saveAs(blob, 'test');
  };
};

export const stopRecording = cb => {
  exportFile(cb);
  mediaRecorder.stop();
};

exportFile();

const initialState = {
  synths: [{ id: "synth1" }],
  synthAmount: 1,
  audioContext: audioContext,
  mainOut: mainOut,
  appStarted: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_SYNTH:
      let synths = state.synths;
      synths.push({ id: `synth${state.synths.length + 1}` });
      return {
        ...state,
        synthAmount: state.synthAmount + 1,
        synths: synths
      };
    case SET_START:
      return {
        ...state,
        appStarted: true
      };
    default:
      return state;
  }
}

/* action creators */
export function setSynth(synth) {
  return {
    type: SET_SYNTH,
    synth
  };
}

export function addSynth() {
  return {
    type: ADD_SYNTH
  };
}

export function setStart() {
  return {
    type: SET_START
  };
}
