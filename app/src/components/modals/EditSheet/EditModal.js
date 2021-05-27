import React, { useState, useContext, useEffect, useRef } from 'react'
import EditAction from './EditAction';
import EditActionType from './EditActionType';
import EditExpectedUpdate from './EditExpectedUpdate';
import { updateItem, deleteItem, addNewItem, completeItem } from '../../../store/actions';
import EditProject from './EditProject';
import ExitIcon from '../../icons/ExitIcon';
import { ModalContext } from '../../../store/contexts/modalContext';
import { DataContext } from '../../../store/contexts/dataContext';
import EditNotes from './EditNotes';


const EditModal = () => {

  const node = useRef(null)
  const { items, weights } = useContext(DataContext)
  const { modalStatus, modalDispatch } = useContext(ModalContext)

  const [newItem, setNewItem] = useState({
    action: '',
    actionType: 1,
    expectedUpdate: new Date(),
    projectID: '',
    notes: ''
  })

  const [changed, setChanged] = useState(false)

  const [isNew, setNew] = useState(true)

  useEffect(() => {
    if(modalStatus && modalStatus.itemID){
      if(items){
        setNewItem(items.filter(item => {return item.id === modalStatus.itemID})[0])
        setNew(false)
      }else{
        setNew(true)
      }
    }
    if(modalStatus.itemProjectID){
      setNewItem({
        action: '',
        actionType: 1,
        expectedUpdate: new Date(),
        projectID: modalStatus.itemProjectID,
        notes: ''
      })
    }
  }, [modalStatus, items])


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
    modalDispatch({type:'HIDE_SHEET'})
  }

  const deleteClicked = (e) => {
    if(window.confirm('Are you sure you want to delete?') === true){
      deleteItem(newItem.id, items, weights)
      modalDispatch({type:'HIDE_SHEET'})
    }
  }


  const doneClick = (e) => {
    if(!changed) return;
    updateItem(newItem)
    modalDispatch({type:'HIDE_SHEET'})
  }

  const addClick = (e) => {
    if(!changed) return;
    addNewItem(newItem)
    modalDispatch({type:'HIDE_SHEET'})
  }

  const completeClick = (e) => {
    if(window.confirm('Are you sure you want to complete?') === true){
      completeItem(newItem.id, items, weights)
      modalDispatch({type:'HIDE_SHEET'})
    }
  }


  return ( 
      <div ref={node} id="modal" className="relative overflow-scroll bg-white h-2/4 mt-10 p-5">
        <div onClick={exitClick} className="h-10 w-10 absolute top-0 right-0">
          <ExitIcon />
        </div>
        { isNew ? (
          <p className="text-xl font-bold">New Item</p>
        ) : null
          //<p className="text-xl font-bold">Edit Item</p>
        }
        <EditProject value={newItem.projectID} change={change} />
        <EditExpectedUpdate value={newItem.expectedUpdate} change={dateChange} />
        <EditActionType value={newItem.actionType} change={change} />
        <EditAction value={newItem.action} change={change} />
        <EditNotes value={newItem.notes} change={change} />
        {
          isNew ? (
            <div className="flex space-x-2 mt-5">
              <button onClick={addClick} className={changed ? "doneBtn" : "inactiveBtn"}>Add</button>
            </div>
          ) : (
            <div>
              <div className="flex space-x-2 mt-5">
                <button onClick={doneClick} className={changed ? "doneBtn" : "inactiveBtn"}>Save</button>
                <button onClick={completeClick} className="completeBtn">Complete Task</button>
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