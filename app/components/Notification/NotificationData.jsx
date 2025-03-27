import { useEffect, useState } from 'react';
import { Link, routes, UserData, Urls, NetworkCaller } from '@/app/components/Link';
import useEcho from '@/hooks/echo';
import { toast } from 'react-toastify';

export default function NotificationData({onNotify}) {
  const networkCaller = new NetworkCaller();
  const [userInfo, setUserInfo] = useState(null);
  // const [userToken, setUserToken] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  const echo = useEcho();

  const fetchNotificationData = async () => {
    const response = await networkCaller.getRequest(Urls.getUserCountedNotification());
    if (response && response.isSuccess) {
      setNotificationCount(response.responseData?.notificationCount);
      setMessageCount(response.responseData?.messageCount);
      onNotify(notificationCount, messageCount);
    }
    //console.log("notifdddfsdf");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await UserData.getUserData();
        // const token = await UserData.getToken();
        // setUserToken(token);
        setUserInfo(userData);
      } catch (error) {
        //console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
    fetchNotificationData();
  }, []);

  const handleEchoCallback = () => {
      //sound.play()
  };

  useEffect(() => {
      if (echo) {
        if(userInfo != null) {
          echo.private(`chat.${userInfo?.id}`).listen('PrivateMessage', event => {
            if(userInfo?.id == event?.receiverId) {
              toast.success(event?.message);
              fetchNotificationData();
              handleEchoCallback();
            }
            //console.log('Real-time event received: ', event);
          })
        }
      }
  
  }, [userInfo, echo]);

  // console.log("NotificationData from Server: ", notificationCount, messageCount);

  return (
    <>
    </>
  );
}
