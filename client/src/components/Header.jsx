export default function Header() {
  return (
    <header className="header">
      <div className="friend">
        <img src="friend.svg?url" width='30px'/>
        <h4 className= "header-title" style={{marginLeft: '10px'}}>Friends</h4>
        <p className="header-word">Online</p>
        <p className="header-word">All</p>
        <p className="header-word">Pending</p>
        <p className="header-word">Blocked</p>
        <button className="add-friend" type="button">Add Friend</button>
      </div>
      <div className="user">
        <h4 className="header-word">User</h4>
        <img src="setting.svg?url" width='30px' style={{cursor: 'pointer'}}></img>
      </div>
    </header>
  )
}
