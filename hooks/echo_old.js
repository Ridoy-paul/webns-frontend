import { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie';
import { axios } from '@/app/lib/axios';

window.Pusher = Pusher;

const OlduseEcho = () => {
    /*
    const [echoInstance, setEchoInstance] = useState(null);

    useEffect(() => {
        console.log('Hook old Echo Running:');

        const tokenInfo = Cookies.get('authToken');
        const token = tokenInfo ? JSON.parse(tokenInfo).token : null;
        console.log('before set token: ' + token);

        // Set the default authorization header for axios requests if token exists
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        console.log('Axios token: ', axios.defaults.headers.common['Authorization']);

        // Create the Echo instance here
        const echo = new Echo({
            broadcaster: 'reverb',
            key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
            authorizer: (channel) => {
                return {
                    authorize: (socketId, callback) => {
                        axios.post('/api/broadcasting/auth', {
                            socket_id: socketId,
                            channel_name: channel.name,
                        })
                        .then(response => {
                            console.log('Echo response: ', response.data);
                            callback(false, response.data);
                        })
                        .catch(error => {
                            callback(true, error);
                            console.log('Echo error: ', error);
                        });
                    },
                };
            },
            wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
            wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
            wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
            forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });

        console.log("echo instance from hook:", echo);

        setEchoInstance(echo);
    }, []);

    return echoInstance;
    */
};

export default OlduseEcho;
