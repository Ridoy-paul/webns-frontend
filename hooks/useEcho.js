import { useEffect, useState } from 'react';
import { axios } from '@/app/lib/axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const useEcho = (ticket_id) => {
  window.Pusher = Pusher;

  const [echoInstance, setEchoInstance] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const echo = new Echo({
      broadcaster: 'reverb',
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
      authorizer: (channel) => {
        return {
          authorize: (socketId, callback) => {
            axios
              .post('/api/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => {
                callback(false, response.data);
              })
              .catch((error) => {
                callback(true, error);
              });
          },
        };
      },
      logToConsole: false,
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
      wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
      wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
      forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https',
      enabledTransports: ['ws', 'wss'],
    });
    setEchoInstance(echo);

    const channel = echo.channel(`chat.${ticket_id}`);

    channel.listen('.new-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.chat]);
    });

    return () => {
      echo.leaveChannel(`chat.${ticket_id}`);
    };
  }, [ticket_id]);

  return { messages, setMessages };
};

export default useEcho;
