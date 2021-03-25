import React, { useContext } from 'react'
import { FbContext } from '../../store/fbContext';
import EditModal from './EditModal';



const EditSheet = () => {

  const { status } = useContext(FbContext)


  if(status.showSheet === false){
    // document.body.style.overflow = 'unset';
    return null
  }

  // document.body.style.overflow = 'hidden';


  return ( 
    <div className='flex justify-center w-screen h-screen bg-gray-400 bg-opacity-40 fixed inset-0'>
      <EditModal />
    </div>
   );
}
 
export default EditSheet;