import React, { useContext } from 'react'
import { DataContext } from '../../../store/contexts/dataContext'

const EditProject = ({value, change}) => {

  const { projects } = useContext(DataContext)

  var sortedProjects = []
  if(projects){
    sortedProjects  = projects.sort((a,b) => {
      return b.totalScore - a.totalScore
    })
  }

  return ( 
    <div className="mt-2">
      <p>Project</p>
      <select className='border-2 border-black' id='projectID' value={value} onChange={change}>
          <option disabled value={''}>Select a Project</option>
        { sortedProjects && sortedProjects.map(project => {
          return <option key={project.id} value={project.id}>{project.name}</option> 
        })}
      </select>
    </div>
   );
}
 
export default EditProject;