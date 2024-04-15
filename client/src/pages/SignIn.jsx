import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // To disables signup button
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/v1/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
      const data = await res.json();

       // If there is an error, we will store it to display to the user later
       if (data.status !== 200) {
        dispatch(signInFailure(data.message));
        return;
       }
      dispatch(signInSuccess(data));
      // we will redirect user to login page
      navigate('/'); 
    } catch (error) {
      dispatch(signInFailure(error.errors));
    }
  };

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      });
      
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <form className="auth-form" method="POST" onSubmit={handleSubmit}>
        <div className="auth-input-div">
          <label>USERNAME</label>
          <input type="text" name="username" id='username' onChange={handleChange} maxLength={12} required/>
        </div>
        <div className="auth-input-div">
          <label>PASSWORD</label>
          <input type="password" name="password" id='password' onChange={handleChange} required/>
        </div>
       
        <button type="submit" className="submit-form" disabled={loading}>Continue</button>
      </form>
      <Link to={'/signup'}><p className="auth-footer">Need an account?</p></Link>
      <p className='error-text'>{error ? `${error}`: ''}</p>
    </div>
  )
}
