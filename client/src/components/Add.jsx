import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Add = () => {

    const [list,setList] = useState({
        name:"",
        amount:"",
    });

  const navigate = useNavigate() 

  const handleChange = (e) =>{
  setList((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  };


  const handleClick = async (e) =>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:8800/lists",list)
        navigate("/")
    } catch(err){
        console.log(err)
    }
  }

  console.log(list)
  return (
    <div className="form">
        <h1>Add New List</h1>
        <input type='text' placeholder='name' onChange={handleChange} name='name'></input>
        <input type='text' placeholder='amount' onChange={handleChange} name='amount'></input>
     <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add