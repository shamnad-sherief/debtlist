import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'


export const Update = () => {

    const [list,setList] = useState({
        name:"",
        amount:"",
    });

  const navigate = useNavigate() 

  const listId = window.location.pathname.split( '/' )[2]

  const handleChange = (e) =>{
  setList((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  };


  const handleClick = async (e) =>{
    e.preventDefault()
    
    try{
        await axios.put("http://localhost:8800/lists/"+listId,list)
        navigate("/")
    } catch(err){
        console.log(err)
    }
  }

  console.log(list)
  return (
    <div className="form">
        <h1>Update List</h1>
        <input type='text' placeholder='name' onChange={handleChange} name='name'></input>
        <input type='text' placeholder='amount' onChange={handleChange} name='amount'></input>
     <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update