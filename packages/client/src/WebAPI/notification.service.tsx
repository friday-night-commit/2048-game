import React, { Component } from 'react';

type notificationProps = {
  title: boolean;
};

class DesktopNotification extends Component {
  constructor(props: notificationProps) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
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

  showNotification() {
    const options: NotificationOptions = {
      body: 'Нажмите, чтобы прочитать',
      icon: 'https://cdn-icons-png.flaticon.com/512/8297/8297354.png?    auto=compress&cs=tinysrgb&dpr=1&w=500',
      dir: 'ltr',
      vibrate: 5
    };
    new Notification('У вас новое сообщение', options);
  }

  render() {
    return (
      <div>
        <button onClick={this.showNotification}>Показать уведомление</button>
      </div>
    );
  }
}

export default DesktopNotification;
