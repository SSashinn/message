import { useState } from "react";
import { useSelector } from "react-redux";

export default function AddFriend() {
  const selfObjectID = useSelector(state => state.user.currentUser.userData._id);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // To disables signup button
      setLoading(true);
      const res = await fetch('http://localhost:3000/v1/api/addfriend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, selfObjectID}), 
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
      setError(data.message);
    } catch (error) {
      setLoading(false);
      setError(error.errors);
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="addfriend-container"> 
      <h3 className= "addfriend-title">ADD FRIEND</h3>
      <p className="addfriend-p">You can add friends with their username</p>
      <form onSubmit={handleSubmit} method="POST">
        <input
          type="hidden"
          value={selfObjectID}
          name="selfObjectID"
        />
        <input 
        className="addfriend-input" 
        type="text" 
        placeholder="You can add friends with their username"
        name="username"
        onChange={handleChange}
        />  
       <button type="submit" className="addfriend-submit" disabled={loading}>Send Friend Request</button>
      </form>  
      <p className='error-text'>{error ? `${error}`: ''}</p>

    </div>
  )
}
