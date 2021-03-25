import React, { useContext } from 'react'
import moment from 'moment'
import ImportanceIcon from '../icons/ImportanceIcon'
import { FbContext } from '../../store/fbContext'


const ItemCardData = ({item}) => {

const { dispatch } = useContext(FbContext)

const expectedUpdate = item.expectedUpdate ? moment.unix(item.expectedUpdate.seconds).format('MM/DD/YY') : null

const itemClick = (e) => {
  dispatch({type: 'SHOW_SHEET', itemID: item.id})
}

const projectClick = (e) => {
  dispatch({type: 'SHOW_PROJECT_SHEET', projectID: item.projectID})
}

  return ( 
    <div className={'border-2 border-black my-2 w-full self-center grid grid-cols-12 '}>
      <div onClick={projectClick} className='mainInfo flex flex-col col-span-4 p-2 bg-black text-white'>
        <p className='text-xs'>{item.score ? item.score.toFixed(2) : 0}</p>
        <p className='text-xl'>{item.project ? item.project.name : ''}</p>
        {/* <p className='text-xs'>{item.importanceName}</p> */}
        <ImportanceIcon importance={item.project ? item.project.importance : 3} />
        <p className='text-sm'>{item.project ? item.project.description : ''}</p>
      </div>
      <div onClick={itemClick} className={"col-span-8 p-2 " + item.colorClass}>
        <p className='text-xl'>{item.actionTypeName}</p>
        <p className='text-sm'>{expectedUpdate}</p>
        <p className='text-base'>{item.action}</p>
      </div>
    </div>
   );
}
 
export default ItemCardData;