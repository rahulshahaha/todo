
export const stateReducer = (state, action) => {
  switch(action.type){
    case 'TOGGLE':
      return {
        ...state,
        workingView: !state.workingView
      }
    default: 
      return state
  }
}