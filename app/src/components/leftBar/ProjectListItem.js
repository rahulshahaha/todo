import React, { useContext } from 'react'
import { FbContext } from '../../store/fbContext'
import ImportanceIcon from '../icons/ImportanceIcon'


const ProjectListItem = ({proj, weights}) => {

  const { dispatch } = useContext(FbContext)

  const click = (e) => {
    dispatch({type: 'SHOW_PROJECT_SHEET', projectID: proj.id})
  }

  return ( 
    <div onClick={click} className="transform hover:scale-125 transition ease-out duration-300 flex justify-between whitespace-nowrap px-2 space-x-2 text-white bg-black rounded-lg cursor-pointer">
      <p className="overflow-hidden overflow-ellipsis">{proj.totalScore.toFixed(2)} - {proj.name}</p>
      <div className="self-center">
        <ImportanceIcon importance={proj.importance} importances={weights.importanceArray} />
      </div>
    </div>
   );
}
 
export default ProjectListItem;