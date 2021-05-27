import React, { useContext } from 'react'
import moment from 'moment'
import ImportanceIcon from '../icons/ImportanceIcon'
import { ModalContext } from '../../store/contexts/modalContext'
import ReactTooltip from 'react-tooltip';


const ItemCardWithProject = ({item}) => {

const { modalDispatch } = useContext(ModalContext)

const expectedUpdate = item.expectedUpdate ? moment.unix(item.expectedUpdate.seconds).format('MM/DD/YY') : null

const itemClick = (e) => {
  modalDispatch({type: 'SHOW_SHEET', itemID: item.id})
}

const projectClick = (e) => {
  modalDispatch({type: 'SHOW_PROJECT_SHEET', projectID: item.projectID})
}

const daysToText = item && item.daysTo === 1 ? 'Tomorrow' : item && item.daysTo === 0 ? 'Today' : item && item.daysTo > 0 ? item.daysTo + ' days' : item && item.daysTo === -1 ? '1 day ago' : item && item.daysTo < 0 ? item.daysTo * -1 + ' days ago' : null;

  return ( 
    <div data-tip={item.notes} className={'rounded-md border-2 border-black my-2 w-full self-center grid grid-cols-12 '}>
      <div onClick={projectClick} className='hover:bg-opacity-50 mainInfo flex flex-col col-span-4 p-2 bg-black text-white'>
        <p className='text-xs'>{item.score ? item.score.toFixed(2) : 0}</p>
        <p className='text-xl'>{item.project ? item.project.name : ''}</p>
        <ImportanceIcon importance={item.project ? item.project.importance : 3} />
        <p className='text-sm'>{item.project ? item.project.description : ''}</p>
      </div>
      <div onClick={itemClick} className={"relative hover:bg-opacity-75 col-span-8 p-2 " + item.colorClass}>
        <p className='text-xl'>{item.action}</p>
        <p className='text-sm'>{expectedUpdate}</p>
        <p className='text-base'>{item.actionTypeName}</p>
        <p className="absolute right-1 top-0">{daysToText}</p>
      </div>
      <ReactTooltip delayShow={500} />
    </div>
   );
}
 
export default ItemCardWithProject;