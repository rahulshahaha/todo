import React, { useContext } from 'react'
import moment from 'moment'
import { FbContext } from '../store/fbContext'


const ItemCardProject = ({item}) => {

const { dispatch } = useContext(FbContext)


const expectedUpdate = item.expectedUpdate ? moment.unix(item.expectedUpdate.seconds).format('MM/DD/YY') : null

const click = (e) => {
  dispatch({type: 'SHOW_SHEET', itemID: item.id})
}

  return ( 
    <div onClick={click} className={'border-2 border-black my-2 w-full self-center grid grid-cols-12 '}>
      <div className='mainInfo justify-center flex flex-col col-span-2 p-2 bg-black text-white'>
        <p className='text-xl self-center'>{item.score ? item.score.toFixed(2) : 0}</p>
      </div>
      <div className={"col-span-10 p-2 " + item.colorClass}>
        <p className='text-xl'>{item.actionTypeName}</p>
        <p className='text-sm'>{expectedUpdate}</p>
        <p className='text-base'>{item.action}</p>
      </div>
    </div>
   );
}
 
export default ItemCardProject;