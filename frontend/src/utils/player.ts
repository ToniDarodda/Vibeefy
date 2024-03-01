// My VLC
import { Howl } from 'howler';

class Player {
  private sound: Howl | null = null;

  play = (src: string) => {
    if (this.sound) {
      this.sound.stop();
    }
    this.sound = new Howl({
      src: [src],
      html5: true,
      volume: 0.5,
    });
    this.sound.play();
  };

  stop = () => {
    if (this.sound) {
      this.sound.stop();
    }
  };

  setVolume = (volume: number) => {
    if (this.sound) {
      this.sound.volume(volume);
    }
  };

  mute = () => {
    if (this.sound) {
      this.sound.mute(true);
    }
  };

  unMute = () => {
    if (this.sound) {
      this.sound.mute(false);
    }
  };
}

export const player = new Player();
