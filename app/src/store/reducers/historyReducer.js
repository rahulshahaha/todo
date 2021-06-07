
export const historyReducer = (state, action) => {
  switch(action.type){
    case 'LOG':
      return {
        ...state,
        updates: state.updates + 1
      }
    default: 
      return state
  }
}