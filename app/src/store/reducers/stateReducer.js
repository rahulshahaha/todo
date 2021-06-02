
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
    case 'TOGGLE_PREVIEW':
      return {
        ...state,
        showPreview: !state.showPreview
      }
    default: 
      return state
  }
}