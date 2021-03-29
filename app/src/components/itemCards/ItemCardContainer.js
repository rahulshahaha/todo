import React from 'react'
import ItemCardWithProject from './ItemCardWithProject'
import ItemCard from './ItemCard'

const ItemCardContainer = ({item, showProject}) => {

  return ( 
    <div className='cursor-pointer'>
      { showProject ? (
        <ItemCardWithProject item={item} />
      ): (
        <ItemCard item={item} />
      )}
    </div>
   );
}
 
export default ItemCardContainer;