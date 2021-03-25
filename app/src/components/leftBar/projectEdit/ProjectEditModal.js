import React, { useContext, useState, useEffect, useRef } from 'react'
import { FbContext } from '../../../store/fbContext';
import EditDescription from './EditDescription';
import EditImportance from './EditImportance';
import EditName from './EditName';
import { deleteProject, updateProject } from '../../../store/actions'
import useItemsInProject from '../../../hooks/useItemsInProject'
import ItemCardContainer from '../../ItemCardContainer';
import ExitIcon from '../../ExitIcon';
import PlusIcon from '../../PlusIcon';

const ProjectEditModal = () => {

  const projNode = useRef(null)

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
    const handleProjectModalClick = (e) => {
      if (projNode.current.contains(e.target)) {
        return;
      }
      // dispatch({type:'HIDE_PROJECT_SHEET'})
    }
    // add when mounted
    document.addEventListener("mousedown", handleProjectModalClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleProjectModalClick);
    };
  }, [dispatch]);

  const change = (e) => {
    setNewProject({
      ...newProject,
      [e.target.id]: e.target.value
    })
    setChanged(true)
  }

  const deleteClicked = (e) => {
    if(window.confirm('Are you sure you want to delete? Deleting this project will also delete all of your actions under the project.') === true){
      deleteProject(newProject.id)
      console.log('delete proj')
      dispatch({type:'HIDE_PROJECT_SHEET'})
    }
  }

  const doneClick = (e) => {
    if(!changed) return
    updateProject(newProject)
    dispatch({type:'HIDE_PROJECT_SHEET'})
  }

  const addClick = (e) => {
    // addNewItem(newItem)
    console.log('add project')
    dispatch({type:'HIDE_PROJECT_SHEET'})
  }

  const exitClick = (e) => {
    dispatch({type:'HIDE_PROJECT_SHEET'})
  }

  const addItem = (e) => {
    dispatch({type: 'SHOW_SHEET', itemProjectID: newProject.id})
  }


  return ( 
    <div ref={projNode} className="relative overflow-scroll bg-white h-5/6 w-1/2 mt-10 p-5">
      <div onClick={exitClick} className="h-10 w-10 absolute top-0 right-0">
        <ExitIcon />
      </div>
      <p className="text-xl font-bold">Edit Project</p>
      <EditName value={newProject.name} change={change} />
      <EditDescription value={newProject.description} change={change} />
      <EditImportance value={newProject.importance} change={change} />
      {
        isNew ? (
          <div className="flex space-x-2 mt-5">
            <button onClick={addClick} className="doneBtn">Add</button>
          </div>
        ) : (
          <div>
            <div className="flex space-x-2 mt-5">
              <button onClick={doneClick} className={changed ? "doneBtn" : "inactiveBtn"}>Done</button>
              <button onClick={deleteClicked} className="importantBtn">Delete</button>
            </div>
            <div>
            </div>
          </div>
        )
      }
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
   );
}
 
export default ProjectEditModal;