import React from 'react'
import ItemCardWithProject from './ItemCardWithProject'
import ItemCard from './ItemCard'

const ItemCardContainer = ({item, showProject, clickable}) => {


  return ( 
    <div className={clickable === false ? 'cursor-default' : 'cursor-pointer'}>
      { showProject ? (
        <ItemCardWithProject item={item} />
      ): (
        <ItemCard item={item} clickable={clickable} />
      )}
    </div>
   );
}
 
export default ItemCardContainer;