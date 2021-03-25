import React, { useContext, useState, useEffect } from 'react'
import { FbContext } from '../../../store/fbContext';
import EditDescription from './EditDescription';
import EditImportance from './EditImportance';
import EditName from './EditName';
import { deleteProject, updateProject, addProject } from '../../../store/actions'
import useItemsInProject from '../../../hooks/useItemsInProject'
import ItemCardContainer from '../../itemCards/ItemCardContainer';
import ExitIcon from '../../icons/ExitIcon';
import PlusIcon from '../../icons/PlusIcon';

const ProjectEditModal = () => {


  const { status, dispatch, projects, items } = useContext(FbContext)

  const [newProject, setNewProject] = useState({
    name: '',
    description:'',
    importance: 3
  })

  const [changed, setChanged] = useState(false)

  const [isNew, setNew] = useState(true)

  const itemsInProj = useItemsInProject(newProject, items, isNew)

  useEffect(() => {
    if(status && status.projectID){
      if(projects){
        setNewProject(projects.filter(proj => {return proj.id === status.projectID})[0])
        setNew(false)
      }else{
        setNew(true)
      }
    }
  }, [status, projects])


  useEffect(() => {
    if(newProject.name === ''){
      setChanged(false)
    }else{
      setChanged(true)
    }
  },[newProject.name])



  const change = (e) => {
    setNewProject({
      ...newProject,
      [e.target.id]: e.target.value
    })
  }

  const deleteClicked = (e) => {
    if(window.confirm('Are you sure you want to delete? Deleting this project will also delete all of your actions under the project.') === true){
      deleteProject(newProject.id)
      dispatch({type:'HIDE_PROJECT_SHEET'})
    }
  }

  const doneClick = (e) => {
    if(!changed) return
    updateProject(newProject)
    dispatch({type:'HIDE_PROJECT_SHEET'})
  }

  const addClick = (e) => {
    if(!changed) return
    addProject(newProject)
    dispatch({type:'HIDE_PROJECT_SHEET'})
  }

  const exitClick = (e) => {
    dispatch({type:'HIDE_PROJECT_SHEET'})
  }

  const addItem = (e) => {
    dispatch({type: 'SHOW_SHEET', itemProjectID: newProject.id})
  }


  return ( 
    <div className="relative overflow-scroll bg-white h-5/6 w-1/2 mt-10 p-5">
      <div onClick={exitClick} className="h-10 w-10 absolute top-0 right-0">
        <ExitIcon />
      </div>
      { isNew ? (
        <p className="text-xl font-bold">New Project</p>
      ):(
        <p className="text-xl font-bold">Edit Project</p>
      )}
      <EditName value={newProject.name} change={change} />
      <EditDescription value={newProject.description} change={change} />
      <EditImportance value={newProject.importance} change={change} />
      {
        isNew ? (
          <div className="flex space-x-2 mt-5">
            <button onClick={addClick} className={changed ? "doneBtn" : 'inactiveBtn'}>Add</button>
          </div>
        ) : (
          <div>
            <div className="flex space-x-2 mt-5">
              <button onClick={doneClick} className={changed ? "doneBtn" : "inactiveBtn"}>Save</button>
              <button onClick={deleteClicked} className="importantBtn">Delete</button>
            </div>
            <div>
            </div>
          </div>
        )
      }
      { isNew ? null : (
        <div>
          <div className="flex space-x-1 mt-10">
            <p className="text-xl font-bold self-center">Actions In Project</p>
            <div onClick={addItem} className="w-8 h-8 cursor-pointer self-center">
              <PlusIcon />
            </div>
          </div>
          { itemsInProj && itemsInProj.map(item => {
            return(
              <ItemCardContainer showProject={false} key={item.id} item={item} />
            )
          })}
        </div>
      )}
    </div>
   );
}
 
export default ProjectEditModal;