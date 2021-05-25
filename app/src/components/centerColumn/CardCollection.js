import React, { useContext } from 'react'
import { DataContext } from '../../store/contexts/dataContext';
import { FbContext } from '../../store/contexts/fbContext';
import ItemCardContainer from '../itemCards/ItemCardContainer';
import useFilteredItems from '../../UseFilteredItems'

const CardCollection = () => {

  const { allLoaded } = useContext(DataContext)
  const { FBuser } = useContext(FbContext)
  const newItems = useFilteredItems()


  if(!FBuser || !allLoaded){
    return null
  }


  return ( 
    <div className="overflow-scroll h-full hideBar">
      { newItems && newItems.map(item => {
        return <ItemCardContainer showProject={true} key={item.id} item={item} />
      })}
    </div>
   );
}
 
export default CardCollection;