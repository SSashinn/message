  import { useSelector } from "react-redux";
  import { useState, useEffect } from "react";
  import styles from './pending.module.css';
  import { useNavigate } from "react-router-dom";

  export default function All() {
    const selfObjectID = useSelector(state => state.user.currentUser.userData._id);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e,otherObjectID) => {
      e.preventDefault();
      try {
        // To disables signup button
        setLoading(true);
        const res = await fetch('http://localhost:3000/v1/api/dm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otherObjectID, selfObjectID }),
        });
        const data = await res.json();

        // If there is an error, we will store it to display to the user later
        if (data.status >= 400) {
          setError(data.message[0].msg);
          setLoading(false);
          return;
        }
        // If there is no error, we will set the loading to false
        setLoading(false);
        const id = data.message;
        navigate(`/message/${id}`);
        console.log(id)
        // setError(data.message);
      } catch (error) {
        setLoading(false);
        setError(error.errors);
      }
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await fetch('http://localhost:3000/v1/api/all', {
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
      return <div>Oops, there must be some error</div>;
    }

    return (
      <div className="addfriend-container">
        <h2 className="component-title">Friends</h2>
        {data.request && data.request.length === 0 && (
          <h4 className={styles.name}>We are the still here for you.</h4>
        )}
        {data.request.map(element => (
          <div key={element.id} className={styles.reqContainer}>
            <p className={styles.name}>{element.name}</p>
            <div>
              <form onSubmit={(e) => handleSubmit(e,element.id)} method="POST">
                <input
                  type="hidden"
                  value={selfObjectID}
                  name="selfObjectID"
                />
                <input
                  type="hidden"
                  value={element.id}
                  name="otherObjectID"
                />
                <button type='submit' className={styles.msgButton}>Start Chat</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    );
  }


