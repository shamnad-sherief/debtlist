import React, { useState, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './styles.css'

const DebtList = () => {
  const [lists, setList] = useState([])


  useEffect(() => {
    const fetchAllList = async() => {
        try {
            const res = await axios.get("http://localhost:8800/lists")
            setList(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    fetchAllList()
    
  }, [])
  
  const handleDelete = async(id) =>{
  try{
        await axios.delete("http://localhost:8800/lists/"+id)
        window.location.reload()
  }catch(err){
    console.log(err);
  }
  }

  return (
   <DragDropContext>
     <div className="debt-list-container">
     <h1>DebtList</h1>
        <Table className='table-container'>
        <Table.Header>
            <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell colSpan="2">Actions</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Droppable droppableId="tbody">
        {
            (provided) => (
                <Table.Body ref={provided.innerRef} {...provided.droppableProps}>
            {lists.map((list, index) => (
            <Draggable draggableId={index.toString()}>
                {
                    (provided) => (
                        <Table.Row key={list.id} ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                <Table.Cell>{list.name}</Table.Cell>
                <Table.Cell>{list.amount}</Table.Cell>
                <Table.Cell><button id='edit-button' ><Link to={{ pathname: `/update/${list.id}`,  state: { name: list.name, amount: list.amount }, }} id='edit' className="button">Edit</Link></button></Table.Cell>
                <Table.Cell><button id='delete-button' className="button" onClick={()=>handleDelete(list.id)}>Delete</button></Table.Cell>
            </Table.Row>
                    )
                }
                
            </Draggable>
            ))}
        </Table.Body>
            )
        }

        </Droppable>
        </Table>

            <Link to="/add" id="submit"> Add new List</Link>
        </div>
   </DragDropContext>
  );
}

export default DebtList
