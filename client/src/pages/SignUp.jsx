import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="auth-container">
      <h2>Create an account</h2>
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
      <Link to={'/signin'}><p className="auth-footer">Already have an account?</p></Link>
    </div>
  )
}
