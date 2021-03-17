import React, { useContext, useState, useEffect } from 'react'
import { FbContext } from '../store/fbContext';


const Config = () => {

  const { weights } = useContext(FbContext)
  const [highImportance, setHighImportance] = useState(0)
  const [lowImportance, setLowImportance] = useState(0)
  const [mediumImportance, setMediumImportance] = useState(0)

  useEffect(() => {
    if(weights){
      const highWeight = weights.importanceTypes.filter(iType => {
        return iType.id === 1
      })[0].weight
      setHighImportance(highWeight)

      const mediumWeight = weights.importanceTypes.filter(iType => {
        return iType.id === 2
      })[0].weight
      setMediumImportance(mediumWeight)

      const lowWeight = weights.importanceTypes.filter(iType => {
        return iType.id === 3
      })[0].weight
      setLowImportance(lowWeight)
    }
  }, [weights])

  const lowWeightChange = (e) => {
    setLowImportance(e.target.value)
  }

  return ( 
    <div>
      <div>
        <h1>Importances</h1>
        <p>High</p>
        <input className="formInput"></input>
        <p>Medium</p>
        <input className="formInput"></input>
        <p>Low</p>
        <input className="formInput"></input>
      </div>
    </div>
   );
}
 
export default Config;