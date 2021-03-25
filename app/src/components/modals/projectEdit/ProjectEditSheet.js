import React, { useContext } from 'react'
import { FbContext } from '../../../store/fbContext'
import ProjectEditModal from './ProjectEditModal'

const ProjectEditSheet = () => {

  const { status, dispatch } = useContext(FbContext)

  const onClick = (e) => {
    if(e.target.id === 'project-bg'){
      dispatch({type:'HIDE_PROJECT_SHEET'})
    }
  }

  if(status.showProjectSheet === false){
    return null
  }


  return ( 
    <div onClick={onClick} id="project-bg" className='flex justify-center w-screen h-screen bg-gray-400 bg-opacity-40 fixed inset-0'>
      <ProjectEditModal />
    </div>
   );
}
 
export default ProjectEditSheet;