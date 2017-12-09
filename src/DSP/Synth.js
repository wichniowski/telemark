import Reverb from "soundbank-reverb";

class Oscillator {
  constructor(context, mainOut, config) {
    this.context = context;
    this.mainOut = mainOut;

    const oscConfig = config
      ? config
      : {
          lfoGain: 600,
          lfoFreq: 10,
          oscFreq: 500,
          lpFilterFreq: 500,
          reverbWet: 0,
          reverbDry: 1
        };

    this.initializeSynth(context, oscConfig);
  }

  initializeSynth(context, config) {
    this.gain = context.createGain();
    this.master = context.createGain();
    this.oscillator = context.createOscillator();
    this.lowpassFilter = context.createBiquadFilter();
    this.waveShaper = context.createWaveShaper();
    this.reverb = new Reverb(context);

    // TODO: Init from Config & Clean Up
    this.lowpassFilter.frequency.value = 22000;
    this.reverb.wet.value = config.reverbWet;
    this.reverb.dry.value = config.reverbDry;

    this.filterLFO = context.createOscillator();
    this.filterLFOGain = context.createGain();
    this.filterLFOGain.gain.value = config.lfoGain;
    this.filterLFO.frequency.value = config.lfoFreq;
    this.filterLFO.start(0);

    this.filterLFO.connect(this.filterLFOGain);
    this.filterLFO.frequency.value = 0;
    this.filterLFOGain.connect(this.lowpassFilter.frequency);
    this.oscillator.connect(this.lowpassFilter);
    this.lowpassFilter.connect(this.waveShaper);
    this.waveShaper.connect(this.gain);

    this.gain.connect(this.reverb);
    this.master.gain.value = 0.5;
    this.reverb.connect(this.master);

    // Songbird Spatial Stuff
    // this.songbird = new Songbird(context);
    // this.setupSpatial();
    // this.songbirdSource = this.songbird.createSource();

    this.stereoPan = context.createStereoPanner();
    this.reverb.connect(this.stereoPan);

    this.stereoPan.connect(this.master);

    // Main Out
    this.master.connect(this.mainOut);
    this.setLFO();
    this.arpSpeed = 600;
  }

  startSequencer() {
    /* this.sequencer = window.setInterval(() => {
      this.play();
      window.setTimeout(() => {
        this.stop();
      },100);
    }, 600); */
  }

  generateRandomSequence() {
    let sequence = [];
    const frequencies = [60, 120, 240, 420, 640, 860];

    for (let i = 0; i < 4; i++) {
      sequence.push(
        frequencies[Math.floor(Math.random() * frequencies.length)]
      );
    }
    return sequence;
  }

  changePan(value) {
    this.stereoPan.pan.value = this.mapSpatialValue(value * 2);
  }

  mapSpatialValue(value) {
    const median = 1;
    return value < median ? (median - value) * -1 : value / 2;
  }

  startArp() {
    let counter = 0;
    const sequence = this.generateRandomSequence();
    this.sequencer = window.setInterval(() => {
      window.setTimeout(() => {
        this.oscillator.frequency.value = sequence[counter];
        counter === sequence.length - 1 ? (counter = 0) : counter++;
      }, 100);
    }, this.arpSpeed);
  }

  stopArp() {
    window.clearInterval(this.sequencer);
  }

  setArpSpeed(speed) {
    this.arpSpeed = speed;
  }

  setupWhiteNoise() {
    let bufferSize = 2 * this.context.sampleRate,
      noiseBuffer = this.context.createBuffer(
        1,
        bufferSize,
        this.context.sampleRate
      ),
      output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    this.whiteNoise = this.context.createBufferSource();
    this.whiteNoise.buffer = noiseBuffer;
    this.whiteNoise.loop = true;
    this.whiteNoise.start(0);
    this.whiteNoise.connect(this.lowpassFilter);
    this.oscillator.disconnect(this.lowpassFilter);
  }

  stopSequencer() {
    window.clearInterval(this.sequencer);
  }

  setFilterFrequency(freq) {
    if (freq > 400) {
      this.lowpassFilter.frequency.value = freq;
    }
  }

  setFilterType(type) {
    this.lowpassFilter.type = type;
  }

  makeDistortionCurve(amount) {
    var k = typeof amount === "number" ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  setDistortion(value) {
    this.waveShaper.curve = this.makeDistortionCurve(value);
    this.waveShaper.oversample = "4x";
  }

  setFilterDetune(value) {
    this.lowpassFilter.detune.value = value;
  }

  setMasterVolume(volume) {
    this.master.gain.value = volume;
  }

  setType(type) {
    this.oscillator.type = type;
  }

  setFilterLFOFrequency(frequency) {
    this.filterLFO.frequency.value = frequency;
  }

  setFilterLFOType(value) {
    if (value < 25) {
      this.filterLFO.type = "sine";
    } else if (value > 25 && value < 50) {
      this.filterLFO.type = "square";
    } else if (value > 50 && value < 75) {
      this.filterLFO.type = "sawtooth";
    } else if (value > 75) {
      this.filterLFO.type = "triangle";
    }
  }

  setVolume(gain = 0.4) {
    this.gain.value = gain;
  }

  setOSCType(type) {
    if (type === "noise") {
      this.setupWhiteNoise();
    } else {
      this.oscillator.type = type;
      if (this.whiteNoise) {
        this.whiteNoise.disconnect(this.lowpassFilter);
        this.oscillator.connect(this.lowpassFilter);
      }
    }
  }

  setLFOType(type) {
    this.lfo.type = type;
  }

  setReverbTryWet(value) {
    this.reverb.wet.value = value;
    this.reverb.dry.value = 1 - value;
  }
  setReverbTime(value) {
    this.reverb.time = value;
  }
  setLFO() {
    this.lfo = this.context.createOscillator();
    this.lfo.frequency.value = 2;
    this.lfoGain = this.context.createGain();
    this.lfo.connect(this.lfoGain);
    this.lfo.start(0);
    this.lfoGain.connect(this.gain.gain);
  }

  setLFOFrequency(hz) {
    this.lfo.frequency.value = hz;
  }

  setFrequency(frequency = 60) {
    this.oscillator.frequency.value = frequency;
    if (!this.oscillator.started) {
      this.oscillator.start(0);
      this.oscillator.started = true;
    }
  }
}

export default Oscillator;
