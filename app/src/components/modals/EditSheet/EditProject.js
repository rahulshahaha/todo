import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../../store/contexts/dataContext'
import Select from 'react-select'
import { ModalContext } from '../../../store/contexts/modalContext'
import BeakerIcon from '../../icons/BeakerIcon'

const EditProject = ({value, change}) => {

  const { projects } = useContext(DataContext)
  const [editing, setEditing] = useState(false)
  const { modalDispatch } = useContext(ModalContext)

  useEffect(() => {
    if(value === ''){
      setEditing(true)
    }else{
      setEditing(false)
    }
  }, [value])

  var sortedProjects = []
  if(projects){
    sortedProjects  = projects.sort((a,b) => {
      return b.totalScore - a.totalScore
    })
  }

  const options = []
  sortedProjects.forEach(proj => {
    options.push({
      value: proj.id,
      label: proj.name
    })
  })

  const project = projects ? projects.filter(proj => {
    return proj.id === value
  })[0] : null


  const click = (e) => {
    setEditing(!editing)
  }


  const changed = (e) => {
    const data = {
      target: {
        id: 'projectID',
        value: e.value
      }
    }
    change(data)
    setEditing(false)
  }

  const viewProject = (e) => {
    modalDispatch({type:'HIDE_SHEET'})
    modalDispatch({type:'SHOW_PROJECT_SHEET', projectID: project.id})
  }

  return ( 
    <div>
      <div className="pr-5 mt-5">
        { editing ? 
          <Select className="w-1/2" options={options} id='projectID' onBlur={click} onClick={click} placeholder={project.name} onChange={changed} autoFocus={true} maxMenuHeight={200} menuIsOpen={true} controlShouldRenderValue={true} />
          :
          <div>
            <div className="flex space-x-1">
              <BeakerIcon />
              <p className="text-lg hover:underline cursor-pointer inline-block" onClick={click}>{project ? project.name : ''}</p>
            </div>
            <div></div>
            <p className="text-sm text-gray-400 cursor-pointer inline-block" onClick={viewProject}>View Project</p>
          </div>
        }
      </div>
    </div>
   );
}
 
export default EditProject;