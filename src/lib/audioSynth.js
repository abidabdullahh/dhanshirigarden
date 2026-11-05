/**
 * Audio synthesis disabled as per design specification.
 */
class SilentAudioEngine {
  constructor() {
    this.ctx = null
  }
  setMuted() {}
  setAtmosphere() {}
  playClick() {}
  dispose() {}
}

export const soundEngine = new SilentAudioEngine()
