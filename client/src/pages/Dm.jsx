import { useState } from 'react';
import styles from './dm.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export default function Dm() {
  const { dmObjectID } = useParams();
  const selfObjectID = useSelector(state => state.user.currentUser.userData._id);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

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
          <p style={{color: 'red'}}>{error}</p>
        </div>
        <form method='POST' onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder="Message" 
          name="message" 
          onChange={handleChange} 
          className={styles.input}/>
          <button className={styles.submitBtn} disabled={loading}>Send</button>
        </form>
      </div>
  )
}
