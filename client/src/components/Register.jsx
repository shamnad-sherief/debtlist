import React,{ useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import * as AxiosLogger from 'axios-logger';
import './login.css'

export const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const instance = axios.create();
  instance.interceptors.request.use(AxiosLogger.requestLogger,AxiosLogger.errorLogger);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:8800/register/",{
        username: username,
        password: password
      })
      console.log(instance)

      if (res.status === 200) {
        console.log(res)
        navigate('/')
      }

    }catch(err){
    console.log(err);
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
          className="form-input" autoComplete="on"
        />
      </label>
      <br />
      <button type="submit" className="form-submit-btn" onClick={handleSubmit}>Create Account</button>
    </form>
    </div>
    
  );
}



export default Register
