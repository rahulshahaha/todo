import React, { useContext } from 'react'
import { ModalContext } from '../../../store/contexts/modalContext';
import EditModal from './EditModal';




const EditSheet = () => {

  const { modalStatus, modalDispatch } = useContext(ModalContext)

  const onClick = (e) => {
    if(e.target.id === "edit-bg"){
      modalDispatch({type:'HIDE_SHEET'})
    }
  }


  if(modalStatus.showSheet === false){
    return null
  }

  return ( 
    <div onClick={onClick} id="edit-bg" className='flex justify-center w-screen h-screen bg-gray-400 bg-opacity-40 fixed inset-0'>
      <EditModal />
    </div>
   );
}
 
export default EditSheet;