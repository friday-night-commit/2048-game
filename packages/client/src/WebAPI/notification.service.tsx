import React, { Component } from 'react';
import { AudioPlayer, SoundNames } from './AudiPlayer';
import { Button } from '@material-tailwind/react';

type notificationProps = {
  title: boolean;
};

class DesktopNotification extends Component {
  private audiPlayer: AudioPlayer;

  constructor(props: notificationProps) {
    super(props);
    this.audiPlayer = new AudioPlayer();
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    this.audiPlayer.init().then();

    if (!('Notification' in window)) {
      alert('Браузер не поддерживает Notification API');
    } else if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-console
      console.log('Notification is allowed');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // eslint-disable-next-line no-console
          console.log('Notification is granted');
        } else {
          // eslint-disable-next-line no-console
          console.log('Notification is not allowed');
        }
      });
    }
  }

  playSound(soundName: string): void {
    this.audiPlayer.getSoundByName(soundName).play();
  }

  showNotification(title: string, content: string) {
    const options: NotificationOptions = {
      body: content,
      icon: 'https://cdn-icons-png.flaticon.com/512/8297/8297354.png?    auto=compress&cs=tinysrgb&dpr=1&w=500',
      dir: 'ltr',
      vibrate: 5,
    };
    new Notification(title, options);
  }

  render() {
    return (
      <div>
        <Button
          className='ml-2 '
          onClick={() =>
            this.showNotification(
              'У вас новое сообщение',
              'Нажмите, чтобы прочитать'
            )
          }>
          Показать уведомление
        </Button>
        <Button
          className='ml-2'
          onClick={() => this.playSound(SoundNames.Notification)}>
          Включить звук 1
        </Button>
        <Button
          className='ml-2'
          onClick={() => this.playSound(SoundNames.Start)}>
          Включить звук 2
        </Button>
      </div>
    );
  }
}

export default DesktopNotification;
