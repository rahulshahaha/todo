import React, { useContext } from 'react'
import { FbContext } from '../../../store/fbContext';
import EditModal from './EditModal';




const EditSheet = () => {

  const { status, dispatch } = useContext(FbContext)

  const onClick = (e) => {
    if(e.target.id === "edit-bg"){
      dispatch({type:'HIDE_SHEET'})
    }
  }


  if(status.showSheet === false){
    return null
  }

  return ( 
    <div onClick={onClick} id="edit-bg" className='flex justify-center w-screen h-screen bg-gray-400 bg-opacity-40 fixed inset-0'>
      <EditModal />
    </div>
   );
}
 
export default EditSheet;