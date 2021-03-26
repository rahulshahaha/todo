import React, { useContext } from 'react'
import { ModalContext } from '../../../store/contexts/modalContext'
import ProjectEditModal from './ProjectEditModal'

const ProjectEditSheet = () => {

  const { modalStatus, modalDispatch } = useContext(ModalContext)

  const onClick = (e) => {
    if(e.target.id === 'project-bg'){
      modalDispatch({type:'HIDE_PROJECT_SHEET'})
    }
  }

  if(modalStatus.showProjectSheet === false){
    return null
  }


  return ( 
    <div onClick={onClick} id="project-bg" className='flex justify-center w-screen h-screen bg-gray-400 bg-opacity-50 fixed inset-0'>
      <ProjectEditModal />
    </div>
   );
}
 
export default ProjectEditSheet;