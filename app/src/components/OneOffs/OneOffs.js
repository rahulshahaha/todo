import React, { useContext } from 'react'
import { FbContext } from '../../store/fbContext';
import AddOneOff from './AddOneOff';
import OneOffItem from './OneOffItem';


const OneOffs = () => {

  const { oneOffs } = useContext(FbContext)



  return ( 
    <div className="w-full">
      <div className="m-auto w-48">
        <h1 className="text-lg font-bold">One Off Items</h1>
        { oneOffs && oneOffs.map(oneOff => {
          return (
            <OneOffItem oneOff={oneOff} key={oneOff.id} />
          )
        })}
        <AddOneOff />
      </div>
    </div>
   );
}
 
export default OneOffs;