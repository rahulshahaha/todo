import React, { useContext } from 'react'
import moment from 'moment'
import { FbContext } from '../store/fbContext'
import ImportanceIcon from './ImportanceIcon'


const ItemCard = ({item}) => {
const expectedUpdate = item.expectedUpdate ? moment.unix(item.expectedUpdate.seconds).format('MM/DD/YY') : null

const { dispatch } = useContext(FbContext)

const click = (e) => {
  dispatch({type: 'SHOW_SHEET', itemID: item.id})
}

  return ( 
    <div onClick={click} className={'border-2 border-black my-2 w-full self-center grid grid-cols-12 cursor-pointer '}>
      <div className='mainInfo flex flex-col col-span-4 p-2 bg-black text-white'>
        <p className='text-xs'>{item.score.toFixed(2)}</p>
        <p className='text-xl'>{item.name}</p>
        {/* <p className='text-xs'>{item.importanceName}</p> */}
        <ImportanceIcon importance={item.importance} />
        <p className='text-sm'>{item.description}</p>
      </div>
      <div className={"col-span-8 p-2 " + item.colorClass}>
        <p className='text-xl'>{item.actionTypeName}</p>
        <p className='text-sm'>{expectedUpdate}</p>
        <p className='text-base'>{item.action}</p>
      </div>
    </div>
   );
}
 
export default ItemCard;