import React from 'react'
import ItemCardData from './ItemCardData'
import ItemCardProject from './ItemCardProject'

const ItemCardContainer = ({item, showProject}) => {

  return ( 
    <div className='cursor-pointer'>
      { showProject ? (
        <ItemCardData item={item} />
      ): (
        <ItemCardProject item={item} />
      )}
    </div>
   );
}
 
export default ItemCardContainer;