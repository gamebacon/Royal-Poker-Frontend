// src/SoundService.js

import Sound from '../util/Sound';

class SoundService {
  constructor() {
    this.sounds = {
      [Sound.CHECK]: new Audio('/sounds/check.wav'),
      [Sound.BET]: new Audio('/sounds/bet.wav'),
      [Sound.CALL]: new Audio('/sounds/call.wav'),
      [Sound.RAISE]: new Audio('/sounds/raise.wav'),
      [Sound.FOLD]: new Audio('/sounds/fold.wav'),
    };
  }

  play(sound) {
    const audio = this.sounds[sound];
    if (audio) {
      audio.currentTime = 0; // Reset to start in case it's still playing
      audio.play().catch((error) => {
        console.error('Failed to play sound:', error);
      });
    } else {
      console.error(`Sound for "${sound}" not found`);
    }
  }
}

const soundService = new SoundService();
export default soundService;
