import NotificationData from './NotificationData';

export default function NotificationResponse({onNotifyChild}) {
  
    const handleOnNotify = (notificationCount, messageCount) => {
        onNotifyChild(notificationCount, messageCount);
    }

  return (
    <NotificationData onNotify={handleOnNotify} />
  );
}
