/**
 * Lightweight procedural Web Audio synthesizer for ambient garden soundscapes
 * and organic tactile micro-interactions.
 * Zero external audio files, 0KB asset download, 100% offline & instantaneous.
 */

class GardenAudioEngine {
  constructor() {
    this.ctx = null
    this.masterGain = null
    this.ambientGain = null
    this.sfxGain = null
    this.isMuted = true
    this.currentAtmosphere = 'sun'
    this.ambientNodes = []
    this.birdTimer = null
    this.rainTimer = null
  }

  init() {
    if (this.ctx) return
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return

    this.ctx = new AudioContextClass()

    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = this.isMuted ? 0 : 0.7
    this.masterGain.connect(this.ctx.destination)

    this.ambientGain = this.ctx.createGain()
    this.ambientGain.gain.value = 0.5
    this.ambientGain.connect(this.masterGain)

    this.sfxGain = this.ctx.createGain()
    this.sfxGain.gain.value = 0.4
    this.sfxGain.connect(this.masterGain)

    // Handle tab visibility to save CPU and silence background
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && this.ctx && this.ctx.state === 'running') {
          this.ctx.suspend()
        } else if (!document.hidden && this.ctx && !this.isMuted && this.ctx.state === 'suspended') {
          this.ctx.resume()
        }
      })
    }
  }

  setMuted(muted) {
    this.isMuted = muted
    this.init()

    if (this.ctx) {
      if (this.ctx.state === 'suspended' && !muted) {
        this.ctx.resume()
      }
      const targetGain = muted ? 0 : 0.7
      const now = this.ctx.currentTime
      this.masterGain.gain.cancelScheduledValues(now)
      this.masterGain.gain.linearRampToValueAtTime(targetGain, now + 0.3)
    }

    if (!muted) {
      this.startAmbient(this.currentAtmosphere)
    } else {
      this.stopAmbient()
    }
  }

  setAtmosphere(mode) {
    this.currentAtmosphere = mode
    if (!this.isMuted) {
      this.startAmbient(mode)
    }
  }

  stopAmbient() {
    if (this.birdTimer) {
      clearInterval(this.birdTimer)
      this.birdTimer = null
    }
    if (this.rainTimer) {
      clearInterval(this.rainTimer)
      this.rainTimer = null
    }
    this.ambientNodes.forEach((node) => {
      try {
        if (node.stop) node.stop()
        if (node.disconnect) node.disconnect()
      } catch {
        // already stopped
      }
    })
    this.ambientNodes = []
  }

  startAmbient(mode) {
    this.stopAmbient()
    if (!this.ctx || this.isMuted) return

    // 1. Soft wind / breeze generator (all modes)
    try {
      const bufferSize = this.ctx.sampleRate * 2
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }

      const whiteNoise = this.ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = mode === 'rain' ? 800 : 320
      filter.Q.value = 1.2

      // Gentle LFO modulating wind frequency
      const lfo = this.ctx.createOscillator()
      const lfoGain = this.ctx.createGain()
      lfo.frequency.value = 0.15
      lfoGain.gain.value = 120
      lfo.connect(filter.frequency)

      const windGain = this.ctx.createGain()
      windGain.gain.value = mode === 'rain' ? 0.22 : 0.08

      whiteNoise.connect(filter)
      filter.connect(windGain)
      windGain.connect(this.ambientGain)

      whiteNoise.start()
      lfo.start()

      this.ambientNodes.push(whiteNoise, lfo, filter, windGain)
    } catch {
      // Audio node init fallback
    }

    // 2. Specific atmospheric layers
    if (mode === 'sun' || mode === 'sunset') {
      // Periodic pleasant chirping birds
      this.playBirdChirp()
      this.birdTimer = setInterval(() => {
        if (!this.isMuted && Math.random() > 0.3) {
          this.playBirdChirp()
        }
      }, 4200)
    } else if (mode === 'rain') {
      // Gentle raindrops patter
      this.rainTimer = setInterval(() => {
        if (!this.isMuted) {
          this.playRaindrop()
        }
      }, 220)
    } else if (mode === 'night') {
      // Crickets / night ambient harmonic pulse
      this.playCricketChirp()
      this.birdTimer = setInterval(() => {
        if (!this.isMuted) {
          this.playCricketChirp()
        }
      }, 2800)
    }
  }

  playBirdChirp() {
    if (!this.ctx || this.isMuted) return
    try {
      const now = this.ctx.currentTime
      const baseFreq = 2200 + Math.random() * 800
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(baseFreq, now)
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.06)
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.14)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.06, now + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2)

      osc.connect(gain)
      gain.connect(this.ambientGain)

      osc.start(now)
      osc.stop(now + 0.22)
    } catch {
      // ignore
    }
  }

  playRaindrop() {
    if (!this.ctx || this.isMuted) return
    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const freq = 600 + Math.random() * 1200

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, now + 0.04)

      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)

      osc.connect(gain)
      gain.connect(this.ambientGain)

      osc.start(now)
      osc.stop(now + 0.06)
    } catch {
      // ignore
    }
  }

  playCricketChirp() {
    if (!this.ctx || this.isMuted) return
    try {
      const now = this.ctx.currentTime
      for (let i = 0; i < 3; i++) {
        const timeOffset = now + i * 0.07
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(4500 + Math.random() * 200, timeOffset)

        gain.gain.setValueAtTime(0.001, timeOffset)
        gain.gain.linearRampToValueAtTime(0.025, timeOffset + 0.015)
        gain.gain.exponentialRampToValueAtTime(0.0001, timeOffset + 0.05)

        osc.connect(gain)
        gain.connect(this.ambientGain)

        osc.start(timeOffset)
        osc.stop(timeOffset + 0.06)
      }
    } catch {
      // ignore
    }
  }

  /** Subtle wooden tactile click on UI interaction */
  playClick() {
    if (!this.ctx || this.isMuted) return
    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.04)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(this.sfxGain)

      osc.start(now)
      osc.stop(now + 0.045)
    } catch {
      // ignore
    }
  }
}

export const soundEngine = typeof window !== 'undefined' ? new GardenAudioEngine() : null
