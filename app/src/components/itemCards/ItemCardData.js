import React, { useContext } from 'react'
import moment from 'moment'
import ImportanceIcon from '../icons/ImportanceIcon'
import { ModalContext } from '../../store/contexts/modalContext'


const ItemCardData = ({item}) => {

const { modalDispatch } = useContext(ModalContext)

const expectedUpdate = item.expectedUpdate ? moment.unix(item.expectedUpdate.seconds).format('MM/DD/YY') : null

const itemClick = (e) => {
  modalDispatch({type: 'SHOW_SHEET', itemID: item.id})
}

const projectClick = (e) => {
  modalDispatch({type: 'SHOW_PROJECT_SHEET', projectID: item.projectID})
}

  return ( 
    <div className={'rounded-md border-2 border-black my-2 w-full self-center grid grid-cols-12 '}>
      <div onClick={projectClick} className='hover:bg-opacity-50 mainInfo flex flex-col col-span-4 p-2 bg-black text-white'>
        <p className='text-xs'>{item.score ? item.score.toFixed(2) : 0}</p>
        <p className='text-xl'>{item.project ? item.project.name : ''}</p>
        {/* <p className='text-xs'>{item.importanceName}</p> */}
        <ImportanceIcon importance={item.project ? item.project.importance : 3} />
        <p className='text-sm'>{item.project ? item.project.description : ''}</p>
      </div>
      <div onClick={itemClick} className={"hover:bg-opacity-75 col-span-8 p-2 " + item.colorClass}>
        <p className='text-xl'>{item.actionTypeName}</p>
        <p className='text-sm'>{expectedUpdate}</p>
        <p className='text-base'>{item.action}</p>
      </div>
    </div>
   );
}
 
export default ItemCardData;