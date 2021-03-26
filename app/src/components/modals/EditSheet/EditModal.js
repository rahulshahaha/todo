import React, { useState, useContext, useEffect, useRef } from 'react'
import EditAction from './EditAction';
import EditActionType from './EditActionType';
import EditExpectedUpdate from './EditExpectedUpdate';
import { updateItem, deleteItem, addNewItem } from '../../../store/actions';
import { FbContext } from '../../../store/contexts/fbContext';
import EditProject from './EditProject';
import ExitIcon from '../../icons/ExitIcon';
import { ModalContext } from '../../../store/contexts/modalContext';


const EditModal = () => {

  const node = useRef(null)
  const { items } = useContext(FbContext)
  const { modalStatus, modalDispatch } = useContext(ModalContext)

  const [newItem, setNewItem] = useState({
    action: '',
    actionType: 1,
    expectedUpdate: new Date(),
    projectID: ''
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
        projectID: modalStatus.itemProjectID
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
      deleteItem(newItem.id)
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


  return ( 
      <div ref={node} id="modal" className="relative overflow-scroll bg-white h-5/6 mt-10 p-5">
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