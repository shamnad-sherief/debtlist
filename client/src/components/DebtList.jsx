import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './styles.css'

const DebtList = () => {
  const [lists, setList] = useState([])

    const { state } = useLocation();

    const userId = state.userId


    useEffect(() => {
    const fetchAllList = async(userId) => {
        try {
            const res = await axios.get("http://localhost:8800/lists/",{ params: { userId } })
                setList(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    fetchAllList(userId)
    
  }, [userId])
  
  const handleDelete = async(id) =>{
  try{
        await axios.delete("http://localhost:8800/lists/"+id)
        window.location.reload()
  }catch(err){
    console.log(err);
  }
  }

  if (!lists.length) {
    return <div className="debt-list-container"> <h1>DebtList</h1> <Link to={`/add/${userId}`} id="submit"> Add new List</Link></div>;
  }

  return (
    <div className="debt-list-container">
      <h1>DebtList</h1>
       <DragDropContext>
       <table className='table-container'>
         <thead>
             <tr>
             <th>Name</th>
             <th>Amount</th>
             <th colSpan="2">Actions</th>
             </tr>
         </thead>
         <Droppable droppableId="tbody">
          {
            (provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
             {lists.map((list, index) => (
             <Draggable key={list.id} draggableId={list.id} index={index}>
              {
                (provided) =>(
                  <tr 
                  ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
                  >
                 <td>{list.name}</td>
                 <td>{list.amount}</td>
                 <td><button id='edit-button' ><Link to={{ pathname: `/update/${list.id}`,  state: { name: list.name, amount: list.amount }, }} id='edit' className="button">Edit</Link></button></td>
                 <td><button id='delete-button' className="button" onClick={()=>handleDelete(list.id)}>Delete</button></td>
             </tr>
                )

              }

             </Draggable>
             ))}
         </tbody>

            )}
         
         </Droppable>
         </table>
       </DragDropContext>

        <Link to={`/add/${userId}`} id="submit"> Add new List</Link>


    </div>
 );
 
}

export default DebtList
