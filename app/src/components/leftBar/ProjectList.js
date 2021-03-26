import React, { useContext } from 'react'
import { FbContext } from '../../store/contexts/fbContext';
import ProjectListItem from './ProjectListItem';
import PlusIcon from '../icons/PlusIcon'
import { ModalContext } from '../../store/contexts/modalContext';

const ProjectList = () => {

  const { projects, items, weights } = useContext(FbContext)
  const { modalDispatch } = useContext(ModalContext)

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

  const addProject = (e) => {
    modalDispatch({type: 'SHOW_PROJECT_SHEET', projectID: null})
  }
  

  return ( 
    <div className="m-auto w-60 mt-10">
      <div className="flex space-x-1">
        <p className='self-center text-xl font-bold'>Projects</p>
        <div onClick={addProject} className="self-center w-6 h-6 cursor-pointer">
          <PlusIcon />
        </div>
      </div>
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