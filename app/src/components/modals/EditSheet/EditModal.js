import React, { useState, useContext, useEffect } from 'react'
import EditAction from './EditAction';
import EditActionType from './EditActionType';
import EditExpectedUpdate from './EditExpectedUpdate';
import { updateItem, deleteItem, addNewItem, completeItem } from '../../../store/actions';
import EditProject from './EditProject';
import ExitIcon from '../../icons/ExitIcon';
import { ModalContext } from '../../../store/contexts/modalContext';
import { DataContext } from '../../../store/contexts/dataContext';
import EditNotes from './EditNotes';
import EditLink from './EditLink';
import moment from 'moment'


const EditModal = () => {

  const { items, weights } = useContext(DataContext)
  const { modalStatus, modalDispatch } = useContext(ModalContext)

  const blankItem = (projID) => {
    const projectID = projID ? projID : ''
    return {
      action: '',
      actionType: 1,
      expectedUpdate: moment().startOf('day').toDate(),
      projectID,
      notes: '',
      link: ''
    }
  }

  const [newItem, setNewItem] = useState(blankItem())
  const [initialItem, setInitialItem] = useState(blankItem())
  const [changedItems, setChangedItems] = useState({
    action: false,
    actionType: false,
    expectedUpdate: false,
    projectID: false,
    notes: false,
    link: false
  })
  const [changed, setChanged] = useState(false)
  const [isNew, setNew] = useState(true)
  const changedClass = isNew ? '' : 'bg-gray-300'


  useEffect(() => {
    if(modalStatus && modalStatus.itemID){
      if(items){
        setNewItem(items.filter(item => {return item.id === modalStatus.itemID})[0])
        setInitialItem(items.filter(item => {return item.id === modalStatus.itemID})[0])
        setNew(false)
      }else{
        setNew(true)
      }
    }
    if(modalStatus.itemProjectID){
      setNewItem(blankItem(modalStatus.itemProjectID))
    }
  }, [modalStatus, items])


  //count changes
  useEffect(() => {
    var changes = 0
    const valuesToCheck = ['action','actionType','projectID','notes','link']
    const newChangedItems = {
      action: false,
      actionType: false,
      expectedUpdate: false,
      projectID: false,
      notes: false,
      link: false
    }

    valuesToCheck.forEach(key => {
      if(newItem[key] !== initialItem[key]){
        changes++
        newChangedItems[key] = true
      }
    })
    const newItemExpectedUpdate = newItem.expectedUpdate.seconds ? moment.unix(newItem.expectedUpdate.seconds).startOf('day') : moment(newItem.expectedUpdate).startOf('day')

    const initialItemExpectedUpdate = initialItem.expectedUpdate.seconds ? moment.unix(initialItem.expectedUpdate.seconds).startOf('day') : moment(initialItem.expectedUpdate).startOf('day')

    if(!newItemExpectedUpdate.isSame(initialItemExpectedUpdate)){
      changes++
      newChangedItems.expectedUpdate = true
    }

    if(changes > 0){
      setChanged(true)
    }else{
      setChanged(false)
    }

    setChangedItems(newChangedItems)

  },[newItem, initialItem])

  
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
    if(!changed || newItem.projectID === "" || newItem.action === "") return;
    addNewItem(newItem)
    modalDispatch({type:'HIDE_SHEET'})
  }

  const completeClick = (e) => {
      completeItem(newItem.id, items, weights)
      modalDispatch({type:'HIDE_SHEET'})
  }


  return ( 
      <div id="modal" className="relative overflow-scroll bg-white h-2/4 mt-10 p-5 w-1/3">
        <div onClick={exitClick} className="h-10 w-10 absolute top-0 right-0">
          <ExitIcon />
        </div>
        <EditActionType changed={changedItems.actionType} changedClass={changedClass} value={newItem.actionType} change={change} />
        <EditAction changed={changedItems.action} changedClass={changedClass} value={newItem.action} change={change} />
        <EditExpectedUpdate changed={changedItems.expectedUpdate} changedClass={changedClass} value={newItem.expectedUpdate} change={dateChange} />
        <EditProject changed={changedItems.projectID} changedClass={changedClass} value={newItem.projectID} change={change} />
        <EditNotes changed={changedItems.notes} changedClass={changedClass} value={newItem.notes} change={change} />
        <EditLink changed={changedItems.link} changedClass={changedClass} value={newItem.link} change={change} />
        {
          isNew ? (
            <div className="flex space-x-2 mt-5">
              <button onClick={addClick} className={changed && newItem.projectID !== "" && newItem.action !== "" ? "doneBtn" : "inactiveBtn"}>Add</button>
            </div>
          ) : (
            <div>
              <div className="flex space-x-2 mt-5">
                <button onClick={doneClick} className={changed && newItem.projectID !== "" && newItem.action !== "" ? "doneBtn" : "inactiveBtn"}>Save</button>
                <button onClick={completeClick} className="completeBtn">Complete Task</button>
                <button onClick={deleteClicked} className="importantBtn">Delete Task</button>
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