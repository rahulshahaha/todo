import React, { useContext } from 'react'
import { ModalContext } from '../../store/contexts/modalContext'
import { useDrag } from 'react-dnd'


const PlanningDayItem = ({daysItem}) => {

  const [{isDragging}, drag] = useDrag(() => ({
    type: 'ITEM',
    item: {...daysItem},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  }))

  const { modalDispatch } = useContext(ModalContext)

  const opacityClass = isDragging ? 'opacity-50' : 'opacity-100'

  const itemClick = (e) => {
    modalDispatch({type: 'SHOW_SHEET', itemID: daysItem.id})
  }



  return ( 
    <div ref={drag} onClick={itemClick} className={"cursor-pointer my-1 overflow-hidden " + daysItem.colorClass + " " + opacityClass} key={daysItem.id}>
      <p className="">({daysItem.score.toFixed(2)}) {daysItem.action}</p>
      <p className="text-xs">{daysItem.project.name}</p>
    </div>
   );
}
 
export default PlanningDayItem;