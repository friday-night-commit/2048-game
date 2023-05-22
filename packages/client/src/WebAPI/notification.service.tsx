import React, { Component } from 'react';
import { AudiPlayer, SoundNames } from './AudiPlayer';
import { Button } from '@material-tailwind/react';

type notificationProps = {
  title: boolean;
};

class DesktopNotification extends Component {
  private audiPlayer: AudiPlayer;

  constructor(props: notificationProps) {
    super(props);
    this.audiPlayer = new AudiPlayer();
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    this.audiPlayer.init().then();

    if (!('Notification' in window)) {
      alert('Браузер не поддерживает Notification API');
    } else if (Notification.permission === 'granted') {
      this.showNotification();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          this.showNotification();
        } else {
          // eslint-disable-next-line no-console
          console.log('Notification is now allowed');
        }
      });
    }
  }

  playSound(soundName: string): void {
    this.audiPlayer.getSoundByName(soundName).play();
  }

  showNotification() {
    const options: NotificationOptions = {
      body: 'Нажмите, чтобы прочитать',
      icon: 'https://cdn-icons-png.flaticon.com/512/8297/8297354.png?    auto=compress&cs=tinysrgb&dpr=1&w=500',
      dir: 'ltr',
      vibrate: 5,
    };
    new Notification('У вас новое сообщение', options);
  }

  render() {
    return (
      <div>
        <Button className='ml-2 ' onClick={this.showNotification}>Показать уведомление</Button>
        <Button className='ml-2' onClick={() => this.playSound(SoundNames.Notification)}>
          Включить звук 1
        </Button>
        <Button className='ml-2' onClick={() => this.playSound(SoundNames.Start)}>
          Включить звук 2
        </Button>
      </div>
    );
  }
}

export default DesktopNotification;
