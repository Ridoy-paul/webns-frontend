import { useState, useEffect } from 'react'
import { axios } from '@/app/lib/axios'
import useEcho from '@/hooks/useEcho';
import { Urls, UserData, NetworkCaller } from '@/app/components/Link';

export default function LiveChat({ ticket_id }) {
  const networkCaller = new NetworkCaller();
  const { messages, setMessages } = useEcho(ticket_id);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserData = async () => {
    const token = await UserData.getToken();
    if(token != null) {
        const response = await networkCaller.getRequest(Urls.authProfile());
        if (response && response.isSuccess) {
            setUserInfo(response.responseData);
        }
    }
  };

  useEffect(() => {
      fetchUserData();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim()) {

      var formData = {
        ticket_id: ticket_id,
        user_id: userInfo.id,
        message: newMessage,
      };

      const response = await networkCaller.postRequestWithToken('/api/v1/send-message', formData);
      if (response) {
        setNewMessage('')
      } else {

      }
      
    }
  }

  return (
    <section className="chat-window">
      <div className="messages-list">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.user_id === 1 ? 'sent' : 'received'}`}>
              <span className="message-bubble">{msg.message}</span>
            </div>
          ))
        )}
      </div>

      <footer className="input-box">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </footer>
    </section>
  )
}
