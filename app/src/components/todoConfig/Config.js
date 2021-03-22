import React, { useContext } from 'react'
import { FbContext } from '../../store/fbContext';
import ImportanceConfig from './ImportanceConfig';


const Config = () => {

  const { weights } = useContext(FbContext)
   
  return ( 
    <div className="mx-10 mb-10">
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