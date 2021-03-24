

export const hydrateWeights = (weights) => {
  weights.importanceArray = importanceArray(weights.importanceTypes)
  weights.actionTypeArray = actionTypeArray(weights.actionTypes)
  return weights
}


const importanceArray = (importanceTypes) => {
  const keys = Object.keys(importanceTypes)
  var importanceArray = []
  for (const key of keys) {
    importanceArray.push(importanceTypes[key])
  }
  importanceArray = importanceArray.sort((a,b) => {
    return a.id - b.id
  })
  
  return importanceArray
}

const actionTypeArray = (actionTypes) => {
  const keys = Object.keys(actionTypes)
  var actionTypeArray = []
  for(const key of keys){
    actionTypeArray.push(actionTypes[key])
  }
  actionTypeArray = actionTypeArray.sort((a,b) => {
    return a.id - b.id
  })
  return actionTypeArray
}