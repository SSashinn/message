import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styles from './pending.module.css'

export default function Pending() {
  const selfObjectID = useSelector(state => state.user.currentUser.userData._id);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3000/v1/api/pending', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selfObjectID }),
        });
        const responseData = await res.json();

        if (res.status !== 200) {
          setError(responseData.message[0].msg);
          setLoading(false);
          return;
        }
        console.log(responseData)
        setData(responseData);
        setError(null);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchData();
  }, [selfObjectID]);

  const rejectReq = async (username, path) => {
    try {
      setLoading(true);
      console.log(username);
      const res = await fetch(`http://localhost:3000/v1/api/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, selfObjectID }),
      });
      const responseData = await res.json();

      if (res.status !== 200) {
        setError(responseData.message[0].msg);
        setLoading(false);
        return;
      }
      setData(responseData);
      setError(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }
  if (!data) {
    return <div>Oops, there must be some error</div>;
  }

  return (
    <div className="addfriend-container">
      <h2 className="component-title">Pending Requests</h2>
      {data.request && data.request.length === 0 && (
        <p className={styles.name}>No pending requests found.</p>
      )}
      {data.request.map(element => (
        <div key={element.id} className={styles.reqContainer}>
          <p className={styles.name}>{element.name}</p>
          <div>
            <button className={styles.acceptBtn} onClick={() => rejectReq(element.name, 'accept')}><img src="correct.png?url" /></button>
            <button className={styles.rejectBtn} onClick={() => rejectReq(element.name, 'reject')}><img src="wrong.png?url" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}


