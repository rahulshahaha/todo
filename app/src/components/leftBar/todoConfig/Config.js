import React, { useContext } from 'react'
import { FbContext } from '../../../store/fbContext';
import ActionConfig from './ActionConfig';
import ImportanceConfig from './ImportanceConfig';


const Config = () => {

  const { weights } = useContext(FbContext)
   
  return ( 
    <div className="w-full">
      <div>
        {
          weights ? (
            <div>
              <ImportanceConfig importanceTypes={weights.importanceTypes} />
              <ActionConfig actionTypes={weights.actionTypes} />
            </div>
          ) : null
        }
      </div>
    </div>
   );
} 
 
export default Config;