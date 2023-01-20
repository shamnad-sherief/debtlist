import React,{ useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import './login.css'

export const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/login/', {
        username,
        password
      });

      if (res.status === 200) {
        if (res.data.userid) {
          const userId = res.data.userid;
          navigate(`/debtlist/`, { state: { userId } });
        }
        else {
          console.log('Invalid username or password.');
        }
      }

    } catch (err) {
      if (err.response.status === 401) {
        console.log('Incorrect username or password.');
      } else {
        console.log('An error occurred. Please try again later.');
      }
    }
  };



  return (
    <div>
    <form className="login-form">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </label>
      <br />
      <button type="submit" className="form-submit-btn" onClick={handleSubmit}>Log in</button>
      <p className='center-text'>OR</p>
      <button className='btn-register'>
      <Link to='/register' style={{ textDecoration: 'none' }}>
          Register
          </Link>
      </button>

    </form>
    </div>
    
  );
}



export default Login
