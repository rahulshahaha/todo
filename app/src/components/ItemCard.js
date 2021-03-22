import React, { useContext } from 'react'
import moment from 'moment'
import { FbContext } from '../store/fbContext'


const ItemCard = ({item}) => {
const expectedUpdate = item.expectedUpdate ? moment.unix(item.expectedUpdate.seconds).format('MM/DD/YY') : null

const { dispatch } = useContext(FbContext)

const click = (e) => {
  dispatch({type: 'SHOW_SHEET', itemID: item.id})
}

  return ( 
    <div onClick={click} className={'border-2 border-black my-2 w-4/6 self-center grid grid-cols-12 cursor-pointer ' + item.colorClass}>
      <div className='mainInfo flex flex-col col-span-3 p-2'>
        <p className='text-sm'>{item.score.toFixed(2)}</p>
        <p className='text-xl'>{item.name}</p>
        <p className='text-xs'>{item.importanceName}</p>
        <p className='text-sm'>{item.description}</p>
      </div>
      <div className="col-span-9 p-2">
        <p className='text-xl'>{item.actionTypeName}</p>
        <p className='text-sm'>{expectedUpdate}</p>
        <p className='text-base'>{item.action}</p>
      </div>
    </div>
   );
}
 
export default ItemCard;