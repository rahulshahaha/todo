
export const stateReducer = (state, action) => {
  switch(action.type){
    case 'TOGGLE_VIEW':
      return {
        ...state,
        workingView: !state.workingView
      }
    case 'TOGGLE_FILTERS':
      return {
        ...state,
        showFilters: !state.showFilters
      }
    default: 
      return state
  }
}