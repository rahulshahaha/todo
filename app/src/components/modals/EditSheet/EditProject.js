import React, { useContext } from 'react'
import useProjectScore from '../../../hooks/useProjectScore'
import { FbContext } from '../../../store/fbContext'

const EditProject = ({value, change}) => {

  const { projects, items } = useContext(FbContext)
  const projectScores = useProjectScore(projects, items)

  var sortedProjects = []
  if(projectScores){
    sortedProjects  = projectScores.sort((a,b) => {
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