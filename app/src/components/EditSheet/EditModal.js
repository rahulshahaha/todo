import React, { useState, useContext, useEffect, useRef } from 'react'
import EditAction from './EditAction';
import EditActionType from './EditActionType';
import EditDescription from './EditDescription';
import EditExpectedUpdate from './EditExpectedUpdate';
import EditImportance from './EditImportance';
import EditName from './EditName';
import { updateItem, deleteItem } from '../../store/actions';
import { FbContext } from '../../store/fbContext';


const EditModal = () => {

  const node = useRef(null)
  const { status, dispatch, items } = useContext(FbContext)

  const [newItem, setNewItem] = useState({
    name: '',
    action: '',
    description:'',
    importance: 3,
    actionType: 1,
    expectedUpdate: new Date()
  })

  useEffect(() => {
    if(status && status.itemID){
      if(items){
        setNewItem(items.filter(item => {return item.id === status.itemID})[0])
      }
    }
  }, [status, items])


  useEffect(() => {

    const handleClick = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      dispatch({type:'HIDE_SHEET'})
    }
    
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [dispatch]);



  const change = (e) => {
    setNewItem({
      ...newItem,
      [e.target.id]: e.target.value
    })
  }

  const dateChange = (newDate) => {
    setNewItem({
      ...newItem,
      expectedUpdate: newDate
    })
  }

  const cancelClick = (e) => {
    if(newItem.new === true){
      deleteItem(newItem.id)
    }
    dispatch({type:'HIDE_SHEET'})
  }

  const deleteClicked = (e) => {
    if(window.confirm('Are you sure you want to delete?') === true){
      deleteItem(newItem.id)
    }
    dispatch({type:'HIDE_SHEET'})
  }


  const doneClick = (e) => {
    updateItem(newItem)
    dispatch({type:'HIDE_SHEET'})
  }


  return ( 
    <div ref={node} className="bg-white h-3/4 w-5/6 mt-10 p-5">
      <EditName value={newItem.name} change={change} />
      <EditImportance value={newItem.importance} change={change} />
      <EditDescription value={newItem.description} change={change} />  
      <EditActionType value={newItem.actionType} change={change} />
      <EditExpectedUpdate value={newItem.expectedUpdate} change={dateChange} />
      <EditAction value={newItem.action} change={change} />
      <div className="flex space-x-2 mt-5">
        <button onClick={cancelClick} className="btn">Cancel</button>
        <button onClick={doneClick} className="doneBtn">Done</button>
      </div>
      <div>
        <button onClick={deleteClicked} className="importantBtn mt-5">Delete Item</button>
      </div>
    </div>
   );
}
 
export default EditModal;