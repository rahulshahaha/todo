import React, { useContext } from 'react'
import { ModalContext } from '../../../store/contexts/modalContext'
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

  const itemScore = daysItem.newScore ? Math.max(daysItem.newScore + daysItem.score,0) : daysItem.score

  return(
    <div ref={drag} onClick={itemClick} className={"cursor-pointer my-1 overflow-hidden " + daysItem.colorClass + " " + opacityClass} key={daysItem.id}>
      <p className="text-xs lg:text-sm">({itemScore.toFixed(2)}) {daysItem.action}</p>
    </div>
  )
}
 
export default PlanningDayItem;