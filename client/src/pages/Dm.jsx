import { useEffect, useState } from 'react';
import styles from './dm.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export default function Dm() {
  const { dmObjectID } = useParams();
  const selfObjectID = useSelector(state => state.user.currentUser.userData._id);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        // To disables signup button
        setLoading(true);
        const res = await fetch('http://localhost:3000/v1/api/chats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dmObjectID }),
        });
        const data = await res.json();

        if (data.status !== 200) {
          setError(data.message[0].msg);
          setLoading(false);
          return;
        }
        setChats(data.messages);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error.errors);
      }
    })();
  }, [dmObjectID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // To disables signup button
      setLoading(true);
      const res = await fetch('http://localhost:3000/v1/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dmObjectID, message, selfObjectID }),
      });
      const data = await res.json();

      // If there is an error, we will store it to display to the user later
      if (data.status !== 201) {
        setError(data.message[0].msg);
        setLoading(false);
        return;
      }
      // If there is no error, we will set the loading to false
      setMessage('');
      setLoading(false);
      // Show msg that friend request sent
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.errors);
    }
  };

  return (
    <div className={styles.dmContainer}>
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        {chats && chats.map(chat => (
          <div key={chat._id} className={styles.container}>
            <div className={styles.header}>
            <h2 className={styles.author}>{chat.author}</h2>
            <p className={styles.time}>{chat.time}</p> 
          </div>
          <p className={styles.body}>{chat.body}</p> 
          </div>
        ))}

      </div>
      <form method='POST' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message...."
          name="message"
          onChange={handleChange}
          className={styles.input} 
          value={message}/>
        <button className={styles.submitBtn} disabled={loading}>Send</button>
      </form>
    </div>
  )
}
