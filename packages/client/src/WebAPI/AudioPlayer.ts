import Sound from './Sound';
import notificationSoundURL from '../assets/sounds/notification.mp3';
import laserSoundURL from '../assets/sounds/laser.mp3';
import victorySoundURL from '../assets/sounds/victory.mp3';

type TSound = {
  name: string;
  url: string;
};

export const enum SoundNames {
  Notification = 'notification',
  Start = 'start',
  Victory = 'victory',
}

const TRACKS: TSound[] = [
  {
    name: SoundNames.Notification,
    url: notificationSoundURL,
  },
  {
    name: SoundNames.Start,
    url: laserSoundURL,
  },
  {
    name: SoundNames.Victory,
    url: victorySoundURL,
  },
];

export class AudioPlayer {
  private _sounds: Sound[] = [];
  private readonly _load: Promise<Sound[]>;

  private _audioContext = new AudioContext();

  constructor() {
    this._load = Promise.all(
      TRACKS.map(sound =>
        fetch(sound.url)
          .then(res => res.arrayBuffer())
          .then((res: ArrayBuffer) => this._decodeAudioData(res))
          .then((buffer: AudioBuffer) => {
            return new Sound(this._audioContext, sound.name, buffer);
          })
      )
    );
  }

  public async init() {
    this._sounds = await this._load;
  }

  public getSoundByName(soundName: string) {
    const foundedSound = this._sounds.find(sound => sound.name === soundName);
    if (!foundedSound) {
      throw new Error(`Не найден звук с именем ${soundName}`);
    }
    return foundedSound;
  }

  private _decodeAudioData(audioData: ArrayBuffer) {
    return new Promise<AudioBuffer>((resolve, reject) => {
      this._audioContext.decodeAudioData(audioData, resolve, reject).then();
    });
  }
}
