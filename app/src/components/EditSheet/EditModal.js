import React, { useState, useContext, useEffect, useRef } from 'react'
import EditAction from './EditAction';
import EditActionType from './EditActionType';
import EditExpectedUpdate from './EditExpectedUpdate';
import { updateItem, deleteItem, addNewItem } from '../../store/actions';
import { FbContext } from '../../store/fbContext';
import EditProject from './EditProject';
import ExitIcon from '../ExitIcon';


const EditModal = () => {

  const node = useRef(null)
  const { status, dispatch, items } = useContext(FbContext)

  const [newItem, setNewItem] = useState({
    action: '',
    actionType: 1,
    expectedUpdate: new Date(),
    projectID: ''
  })

  const [changed, setChanged] = useState(false)

  const [isNew, setNew] = useState(true)

  useEffect(() => {
    if(status && status.itemID){
      if(items){
        setNewItem(items.filter(item => {return item.id === status.itemID})[0])
        setNew(false)
      }else{
        setNew(true)
      }
    }
    if(status.itemProjectID){
      setNewItem({
        action: '',
        actionType: 1,
        expectedUpdate: new Date(),
        projectID: status.itemProjectID
      })
    }
  }, [status, items])


  useEffect(() => {

    const handleItemModalClick = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      dispatch({type:'HIDE_SHEET'})
    }
    // add when mounted
    document.addEventListener("mousedown", handleItemModalClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleItemModalClick);
    };
  }, [dispatch]);



  useEffect(() => {
    if(newItem.projectID === '' || newItem.action === ''){
      setChanged(false)
    }else{
      setChanged(true)
    }
  },[newItem.projectID, newItem.action])

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

  const exitClick = (e) => {
    dispatch({type:'HIDE_SHEET'})
  }

  const deleteClicked = (e) => {
    if(window.confirm('Are you sure you want to delete?') === true){
      deleteItem(newItem.id)
      dispatch({type:'HIDE_SHEET'})
    }
  }


  const doneClick = (e) => {
    if(!changed) return;
    updateItem(newItem)
    dispatch({type:'HIDE_SHEET'})
  }

  const addClick = (e) => {
    if(!changed) return;
    addNewItem(newItem)
    dispatch({type:'HIDE_SHEET'})
  }


  return ( 
    <div ref={node} className="relative overflow-scroll bg-white h-5/6 w-1/4 mt-10 p-5">
      <div onClick={exitClick} className="h-10 w-10 absolute top-0 right-0">
        <ExitIcon />
      </div>
      { isNew ? (
        <p className="text-xl font-bold">New Item</p>
      ) : (
        <p className="text-xl font-bold">Edit Item</p>
      )}
      <EditProject value={newItem.projectID} change={change} />
      <EditActionType value={newItem.actionType} change={change} />
      <EditExpectedUpdate value={newItem.expectedUpdate} change={dateChange} />
      <EditAction value={newItem.action} change={change} />
      {
        isNew ? (
          <div className="flex space-x-2 mt-5">
            <button onClick={addClick} className={changed ? "doneBtn" : "inactiveBtn"}>Add</button>
          </div>
        ) : (
          <div>
            <div className="flex space-x-2 mt-5">
              <button onClick={doneClick} className={changed ? "doneBtn" : "inactiveBtn"}>Save</button>
              <button onClick={deleteClicked} className="importantBtn">Delete Item</button>
            </div>
            <div>
            </div>
          </div>
        )
      }
    </div>
   );
}
 
export default EditModal;