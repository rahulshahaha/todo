import React from 'react';

const ImportanceIcon = ({importance}) => {

  var color = "green"
  switch(importance){
    case 1:
      color = "red"
      break;
    case 2:
      color = "yellow"
      break;
    default:
      color = "green"
  }

  const numberOfDots = importance === 1 ? 3 : importance === 3 ? 1 : 2;

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