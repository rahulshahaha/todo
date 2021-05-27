import React, { useContext, useState } from 'react'
import { DataContext } from '../../../store/contexts/dataContext'

const EditProject = ({value, change}) => {

  const { projects } = useContext(DataContext)
  const [editing, setEditing] = useState(false)

  var sortedProjects = []
  if(projects){
    sortedProjects  = projects.sort((a,b) => {
      return b.totalScore - a.totalScore
    })
  }

  const project = projects ? projects.filter(proj => {
    return proj.id === value
  })[0] : null


  const click = (e) => {
    setEditing(!editing)
  }

  const changed = (e) => {
    change(e)
    setEditing(false)
  }

  return ( 
    <div className="mt-2">
      { editing ? 
        <select autoFocus onBlur={click} onClick={click} size={10} className='border-2 border-black text-xl font-bold' id='projectID' value={value} onChange={changed}>
            <option disabled value={''}>Select a Project</option>
          { sortedProjects && sortedProjects.map(project => {
            return <option key={project.id} value={project.id}>{project.name}</option> 
          })}
        </select>
        :
        <p className="text-xl font-bold hover:underline cursor-pointer" onClick={click}>{project ? project.name : ''}</p>
      }

    </div>
   );
}
 
export default EditProject;