import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="friend">
        <img src="friend.svg?url" width='30px'/>
        <h4 className= "header-title" style={{marginLeft: '10px'}}>Friends</h4>
        <Link to={'/online'}><p className="header-word">Online</p></Link> 
        <Link to={'/all'}><p className="header-word">All</p></Link> 
        <Link to={'/pending'}><p className="header-word">Pending</p></Link> 
        <Link to={'/blocked'}><p className="header-word">Blocked</p></Link> 
        <Link to={'/addfriend'}><button className="add-friend" type="button">Add Friend</button></Link>
      </div>
      <div className="user">
        <h4 className="header-word">User</h4>
        <img src="setting.svg?url" width='30px' style={{cursor: 'pointer'}}></img>
      </div>
    </header>
  )
}
