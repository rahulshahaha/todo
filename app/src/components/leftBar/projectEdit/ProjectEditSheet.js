import React, { useContext } from 'react'
import { FbContext } from '../../../store/fbContext'
import ProjectEditModal from './ProjectEditModal'

const ProjectEditSheet = () => {

  const { status } = useContext(FbContext)


  if(status.showProjectSheet === false){
    return null
  }


  return ( 
    <div className='flex justify-center w-screen h-screen bg-gray-400 bg-opacity-40 fixed inset-0'>
      <ProjectEditModal />
    </div>
   );
}
 
export default ProjectEditSheet;