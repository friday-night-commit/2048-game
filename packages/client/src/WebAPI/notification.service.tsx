class DesktopNotification {
  constructor() {
    this.showNotification = this.showNotification.bind(this);
    this.init();
  }

  init() {
    if (!('Notification' in window)) {
      // eslint-disable-next-line no-console
      console.log('Notification API is not allowed');
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
    return this;
  }

  showNotification(title: string, body: string, icon = 'https://cdn-icons-png.flaticon.com/512/8297/8297354.png?    auto=compress&cs=tinysrgb&dpr=1&w=500') {
    const options: NotificationOptions = {
      body,
      icon,
      dir: 'ltr',
      vibrate: 5,
    };
      new Notification(title, options);
  }
}

export default DesktopNotification;
