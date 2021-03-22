import React, { useContext } from 'react'
import { FbContext } from '../../store/fbContext';
import ImportanceConfig from './ImportanceConfig';


const Config = () => {

  const { weights } = useContext(FbContext)
   
  return ( 
    <div className="w-full">
      <div>
        {
          weights ? (
            <ImportanceConfig importanceTypes={weights.importanceTypes} /> 
          ) : null
        }
      </div>
    </div>
   );
} 
 
export default Config;