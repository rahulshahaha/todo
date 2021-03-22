import React, { useContext, useEffect, useState } from 'react'
import { updateItem, deleteItem } from '../../store/actions';
import { FbContext } from '../../store/fbContext';
import EditAction from './EditAction';
import EditActionType from './EditActionType';
import EditDescription from './EditDescription';
import EditExpectedUpdate from './EditExpectedUpdate';
import EditImportance from './EditImportance';
import EditName from './EditName';


const EditSheet = () => {

  const { status, dispatch } = useContext(FbContext)
  const [newItem, setNewItem] = useState({
    name: '',
    action: '',
    description:'',
    importance: 3
  })

  useEffect(() => {
    if(status && status.item){
      setNewItem(status.item)
    }
  }, [status])

  if(status.showSheet === false || status.item === null){
    document.body.style.overflow = 'unset';
    return null
  }

  document.body.style.overflow = 'hidden';

  const cancelClick = (e) => {
    setNewItem({
      name: '',
      action: '',
      description:''
    })
    dispatch({type:'HIDE_SHEET'})
  }

  const doneClick = (e) => {
    updateItem(newItem)
    setNewItem({
      name: '',
      action: '',
      description:''
    })
    dispatch({type:'HIDE_SHEET'})
  }

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

  const deleteClicked = (e) => {
    if(window.confirm('Are you sure you want to delete?') === true){
      deleteItem(newItem.id)
    }
    dispatch({type:'HIDE_SHEET'})
  }

  return ( 
    <div className='flex justify-center w-screen h-screen bg-gray-400 bg-opacity-40 fixed inset-0'>
      <div className="bg-white h-3/4 w-5/6 mt-10 p-5">
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
    </div>
   );
}
 
export default EditSheet;