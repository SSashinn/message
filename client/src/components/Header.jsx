import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('http://localhost:3000/v1/api/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };

  // Get username to display it in header
  const {username} = useSelector(state => state.user.currentUser.userData);
  return (
    <header className="header">
      <div className="friend">
        <img src="friend.svg?url" width='30px'/>
        <h4 className= "header-title" style={{marginLeft: '10px'}}>Friends</h4>
        <Link to={'/online'}><p className="header-word">Online</p></Link> 
        <Link to={'/all'}><p className="header-word">All</p></Link> 
        <Link to={'/pending'}><p className="header-word">Pending</p></Link> 
        <Link to={'/addfriend'}><button className="add-friend" type="button">Add Friend</button></Link>
      </div>
      <div className="user">
        <h4 className="header-word">{username}</h4>
        <img src="setting.svg?url" width='30px' style={{cursor: 'pointer'}}></img>
        <button className="signout" type="button" onClick={handleSignOut}>Logout</button>
      </div>
    </header>
  )
}
