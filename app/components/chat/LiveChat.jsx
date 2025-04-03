import { useState, useEffect } from 'react'
import useEcho from '@/hooks/useEcho';
import { Urls, UserData, NetworkCaller } from '@/app/components/Link';
import { toast } from 'react-toastify';

export default function LiveChat({ ticket_id }) {
  const networkCaller = new NetworkCaller();
  const { messages, setMessages } = useEcho(ticket_id);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDataAndMessages = async () => {
    const token = await UserData.getToken();
    if (token) {
      const response = await networkCaller.getRequest(Urls.authProfile());
      if (response && response.isSuccess) {
        setUserInfo(response.responseData);
      }
    }

    const chatResponse = await networkCaller.getRequest(`/api/v1/chat-history/${ticket_id}`);
    if (chatResponse) {
      const sortedMessages = chatResponse.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      setMessages(sortedMessages);
    }
    setLoading(false);
  };
  

  useEffect(() => {
    fetchUserDataAndMessages();
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
        setNewMessage('');
      } else {
        toast.error('Failed to send message!');
      }
    }
  };

  return (
    <section className="chat-window">
      {loading ? (
        <p>Loading chat...</p>
      ) : (
        <>
          <div className="messages-list">
            {messages.length == 0 ? (
              <p className="no-messages">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.user_id === userInfo?.id ? 'sent' : 'received'}`}>
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
        </>
      )}
    </section>
  );
}
