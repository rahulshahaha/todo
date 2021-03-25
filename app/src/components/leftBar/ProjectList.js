import React, { useContext } from 'react'
import { FbContext } from '../../store/fbContext';
import ProjectListItem from './ProjectListItem';

const ProjectList = () => {

  const { projects, items, weights } = useContext(FbContext)

  var newProjects = [];
  if(projects && items){
    newProjects = projects.map(proj => {
      const itemsInProj = items.filter(item => {
        if(!item.project) return false
        return item.project.id === proj.id
      })
      var projScore = 0;
      itemsInProj.forEach(item => projScore += item.score)
      return {...proj, totalScore: projScore}
    })
  }

  newProjects.sort((a,b) => {
    return b.totalScore - a.totalScore
  })
  

  return ( 
    <div className="m-auto w-60 mt-10">
      <div className="flex flex-col space-y-1">
        { newProjects && newProjects.map(proj => {
          return (
            <ProjectListItem key={proj.id} proj={proj} weights={weights} />
          )
        })}
      </div>
    </div>
   );
}
 
export default ProjectList;