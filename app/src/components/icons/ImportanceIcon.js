import React, { useContext } from 'react';
import { FbContext } from '../../store/contexts/fbContext';
const interpolate = require('color-interpolate');

const ImportanceIcon = ({importance}) => {

  const { weights } = useContext(FbContext)
  const importances = weights ? weights.importanceArray : null

  // const colors = interpolate([[0, 255, 0],[127,255,0],[255,255,0],[255,127,0],[255,0,0]])
  const colors = interpolate([[255, 255, 255],[255,0,0]])
  var color = colors(0)
  const totalImportances = importances.length

  const sortedImportances = importances.sort((a,b) => {
    return a.weight - b.weight
  })
  
  var numberOfDots = 1;
  for(var i = 1; i <= sortedImportances.length; i++){
    if(sortedImportances[i-1].id === importance){
      numberOfDots = i;
      color = colors((i-1)/(totalImportances-1))
    }
  }

  

  var dots = []
  for (let i = 1; i <= numberOfDots; i++) {
    dots.push(i);
  }


  return ( 
    <div className="flex">
      { dots && dots.map(dot => {
        return(
          <div className="h-3 w-3" key={dot}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1" fill={color} />
            </svg>
          </div>
        )
      })}
    </div>
   );
}
 
export default ImportanceIcon;