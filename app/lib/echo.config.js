import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Define global types for Pusher and Echo (optional)
/*
declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}
*/

window.Pusher = Pusher;
export const pvtLaraEcho = (token) => {
 console.log('token from echo:', token);
  return new Echo({
    broadcaster: "reverb",
    authEndpoint: "http://localhost:8000/api/broadcasting/auth",
    logToConsole: true,
    auth: {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': "Bearer " +token,
      },
    },
    encrypted: false,
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
    wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
  });
};

export const laraEcho = new Echo({
  broadcaster: "reverb",
  encrypted: false,
  key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
  wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
  wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
  wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
  forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
  enabledTransports: ["ws", "wss"],
});