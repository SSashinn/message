import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // To disables signup button
      setLoading(true);
      const res = await fetch('http://localhost:3000/v1/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
      const data = await res.json();

       // If there is an error, we will store it to display to the user later
       if (data.status !== 201) {
        setError(data.errors[0].msg);
        setLoading(false);
        return;
       }
      // If there is no error, we will set the loading to false
      setLoading(false);
      // Setting any previous error to null so we don't display it on screen
      setError(null);
      // we will redirect user to login page
      navigate('/signin'); 
    } catch (error) {
      setLoading(false);
      setError(error.errors);
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
      <h2>Create an account</h2>
      <form className="auth-form" method="POST" onSubmit={handleSubmit}>
        <div className="auth-input-div">
          <label>USERNAME</label>
          <input type="text" name="username" onChange={handleChange} required maxLength={12} id='username'/>
        </div>
        <div className="auth-input-div">
          <label>PASSWORD</label>
          <input type="password" name="password"  id='password' onChange={handleChange} required/>
        </div>
       
        <button type="submit" className="submit-form" disabled={loading}>Continue</button>
      </form>
      <Link to={'/signin'}><p className="auth-footer">Already have an account?</p></Link>
      <p className='error-text'>{error ? `${error}`: ''}</p>
    </div>
  )
}
