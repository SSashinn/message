import {Link} from 'react-router-dom';

export default function SignIn() {
  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <form className="auth-form" method="POST">
        <div className="auth-input-div">
          <label>USERNAME</label>
          <input type="text" name="username" />
        </div>
        <div className="auth-input-div">
          <label>PASSWORD</label>
          <input type="password" name="password" />
        </div>
       
        <button type="button" className="submit-form">Continue</button>
      </form>
      <Link to={'/signup'}><p className="auth-footer">Need an account?</p></Link>
    </div>
  )
}
