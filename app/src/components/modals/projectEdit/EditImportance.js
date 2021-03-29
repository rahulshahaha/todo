import React, { useContext } from 'react'
import { DataContext } from '../../../store/contexts/dataContext';


const EditImportance = ({value, change}) => {

  const { weights } = useContext(DataContext)

  var importances = weights ? weights.importanceArray : null
  if(importances){
    importances = importances.sort((a,b) => {
      return b.weight - a.weight
    })
  }

  return ( 
    <div className="mt-2">
      <p>Importance</p>
      <select className='border-2 border-black' id='importance' onChange={change} value={value}>
      { importances && importances.map(importance => {
        return(
          <option key={importance.id} value={importance.id}>{importance.name}</option>
        )
      })}
      </select>
    </div>
   );
}
 
export default EditImportance;