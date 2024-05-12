import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const selfObjectID = useSelector(state => state.user.currentUser.userData._id);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3000/v1/api/sidebar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selfObjectID }),
        });
        const data = await res.json();
        console.log(data);
        if (data.status !== 200) {
          setError(data.message[0].msg);
            return;
        }
        setData(data.dm);
        setError(null);
      } catch (error) {
        setError(error.errors);
      }
    })();
  }, [selfObjectID]);

  return (
    <div className="sidebar">
      <h3>Direct Message</h3>
      {data && data.map(chat => (
          <Link to={`message/${chat.id}`} key={chat.id}>
            <p>{chat.user}</p>
          </Link> 
        ))}
    </div>
  )
}
