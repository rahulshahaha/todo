import React, { useContext } from 'react'
import { FbContext } from '../store/fbContext';
import ItemCard from './ItemCard';


const CardCollection = () => {

  const { items } = useContext(FbContext)
  const sortedItems = items ? items.sort((a,b) => {
    if(a.expectedUpdate === null) return 1
    if(b.expectedUpdate === null) return -1
    return b.score - a.score
  }) : null;


  return ( 
    <div className='flex flex-col w-full col-span-8'>
      { sortedItems && sortedItems.map(item => {
        return <ItemCard key={item.id} item={item} />
      })}
    </div>
   );
}
 
export default CardCollection;