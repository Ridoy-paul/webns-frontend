import { useEffect, useState } from 'react'
import { axios } from '@/app/lib/axios'
import Echo from 'laravel-echo'

import Pusher from 'pusher-js'


const useEcho = () => {
  window.Pusher = Pusher
    
    const [echoInstance, setEchoInstance] = useState(null)

    useEffect(() => {
        // console.log('Axios token: ', axios.defaults.headers.common['Authorization']);
        // console.log('CSRF token: ', axios.defaults.headers.common['X-CSRF-TOKEN']);

        const echo = new Echo({
            broadcaster: 'reverb',
            key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
            authorizer: channel => {
                return {
                    authorize: (socketId, callback) => {
                        axios.post('/api/broadcasting/auth', {
                                socket_id: socketId,
                                channel_name: channel.name,
                            })
                            .then(response => {
                                //console.log('Echo response: ', response.data)
                                callback(false, response.data)
                            })
                            .catch(error => {
                                callback(true, error)
                            })
                    },
                }
            },
            logToConsole: false,
            wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
            wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
            wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
            forceTLS:
                (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        })
        //console.log("Echo Instance from Echo: ", echo);
        setEchoInstance(echo)
    }, [])

    return echoInstance
}

export default useEcho
