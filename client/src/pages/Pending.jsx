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
        console.log(responseData);
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
    return <div>No pending requests found.</div>;
  }

  return (
    <div className="addfriend-container">
      <h2 className= "component-title">Pending Requests</h2>
      {data.request.map(value => (
        <div key={value.id} className={styles.reqContainer}>
          <p className={styles.name}>{value.name}</p>
          <div>
            <button className={styles.acceptBtn}><img src="correct.png?url"/></button>
            <button className={styles.rejectBtn}><img src="wrong.png?url"/></button>

          </div>
        </div>
      ))}
    </div>
  );
}


