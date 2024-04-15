import { useState } from "react";

export default function AddFriend() {
  const [objectId, setObjectId] = useState('');
  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="addfriend-container"> 
      <h3 className= "addfriend-title">ADD FRIEND</h3>
      <p className="addfriend-p">You can add friends with their username</p>
      <input
        type="hidden"
        value={objectId}
        name="selfObjectID"
      />
      <input 
      className="addfriend-input" 
      type="text" 
      placeholder="You can add friends with their username"
      name="username"
      onChange={handleChange}
      />  
      <button type="button" className="addfriend-submit">Send Friend Request</button>
    </div>
  )
}
