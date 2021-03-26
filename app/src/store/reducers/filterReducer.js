
export const filterReducer = (state, action) => {
  switch(action.type){
    case 'SETUP_IMPORTANCE_FILTERS':
      var importanceFilters = {}
      action.importances.forEach(importance => {
        importanceFilters[importance.id] = true
      })
      return{
        ...state,
        importanceFilters
      }
    case 'SET_IMPORTANCE_FILTER':
      return{
        ...state,
        importanceFilters:{
          ...state.importanceFilters,
          [action.importance]: action.value
        }
      }
    case 'ALL_IMPORTANCE':
      var newImportanceFilters = {}
      const ikeys = Object.keys(action.importances)
      for (const key of ikeys) {
        newImportanceFilters[key] = action.value
      }
      return{
        ...state,
        importanceFilters: newImportanceFilters
      }
    case 'SET_ACTION_FILTER':
      return{
        ...state,
        actionFilters:{
          ...state.actionFilters,
          [action.actionType]: action.value
        }
      }
    case 'ALL_ACTION':
      var newActionFilters = {}
      const akeys = Object.keys(action.actionTypes)
      for (const key of akeys) {
        newActionFilters[key] = action.value
      }
      return{
        ...state,
        actionFilters: newActionFilters
      }
    case 'SET_DAY_FILTER':
      return{
        ...state,
        dayFilter: action.value
      }
    default: 
      return state
  }
}