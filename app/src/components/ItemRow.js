import React from 'react'
import ItemName from './ItemInfo/ItemName';
import ItemImportance from './ItemInfo/ItemImportance';
import ItemDescription from './ItemInfo/ItemDescription';
import ItemActionType from './ItemInfo/ItemActionType';
import ItemAction from './ItemInfo/ItemAction';
import ItemExpectedUpdate from './ItemInfo/ItemExpectedUpdate';
import TrashIcon from './TrashIcon';


const ItemRow = ({ item }) => {

  return ( 
    <tr className={item.colorClass}>
      <td className='relative'>
        <TrashIcon itemID={item.id} />
        {item.score.toFixed(2)}
      </td>
      <ItemName item={item} />
      <ItemImportance item={item} />
      <ItemDescription item={item} />
      <ItemActionType item={item} />
      <ItemAction item={item} />
      <ItemExpectedUpdate item={item} />
    </tr>
   );
}
 
export default ItemRow;