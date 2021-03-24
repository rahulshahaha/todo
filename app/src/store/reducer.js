
export const reducer = (state, action) => {
  switch(action.type){
    case 'SHOW_SHEET':
      return {
        ...state,
        showSheet: true,
        itemID: action.itemID
      }
    case 'HIDE_SHEET':
      return{
        ...state,
        showSheet: false,
        itemID: null
      }
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
      return{
        ...state,
        importanceFilters:{
          1: action.value,
          2: action.value,
          3: action.value
        }
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
      return{
        ...state,
        actionFilters:{
          1: action.value,
          2: action.value,
          3: action.value,
          4: action.value,
          5: action.value,
          6: action.value
        }
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