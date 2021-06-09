import React, { useContext } from 'react'
import { DataContext } from '../../store/contexts/dataContext'
import { FbContext } from '../../store/contexts/fbContext'
import { ModalContext } from '../../store/contexts/modalContext'

const AddItem = () => {

  const { FBuser } = useContext(FbContext)
  const { modalDispatch } = useContext(ModalContext)
  const { projects } = useContext(DataContext)

  var sortedProjects = []
  if(projects){
    sortedProjects  = projects.sort((a,b) => {
      return b.totalScore - a.totalScore
    })
  }


  // const addItem = () => {
  //   modalDispatch({type:'SHOW_SHEET'})
  // }

  const changed = (e) => {
    console.log(e.target.value)
    modalDispatch({type: 'SHOW_SHEET', itemProjectID: e.target.value})
  }


  if(FBuser === null) return false

  return ( 
    // <button className="doneBtn" onClick={addItem}>Add ToDo</button>
    <select autoFocus className='border-2 border-none w-32 bg-doToday rounded-md text-white' id='projectID' onChange={changed} value=''>
      <option disabled value={''}>Add ToDo</option>
      { sortedProjects && sortedProjects.map(project => {
        return <option key={project.id} value={project.id}>{project.name}</option> 
      })}
    </select>
   );
}
 
export default AddItem;