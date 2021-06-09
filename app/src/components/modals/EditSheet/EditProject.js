import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../../store/contexts/dataContext'
import Select from 'react-select'

const EditProject = ({value, change}) => {

  const { projects } = useContext(DataContext)
  const [editing, setEditing] = useState(false)

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
    console.log('here')
    setEditing(!editing)
  }


  const changed = (e) => {
    console.log(e)
    const data = {
      target: {
        id: 'projectID',
        value: e.value
      }
    }
    change(data)
    setEditing(false)
  }

  return ( 
    <div className="mt-2 pr-5">
      { editing ? 
        <Select options={options} id='projectID' onBlur={click} onClick={click} placeholder={project.name} onChange={changed} autoFocus={true} maxMenuHeight={200} menuIsOpen={true} controlShouldRenderValue={true} />
        :
        <p className="text-xl font-bold hover:underline cursor-pointer" onClick={click}>{project ? project.name : ''}</p>
      }

    </div>
   );
}
 
export default EditProject;