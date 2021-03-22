
export const reducer = (state, action) => {
  switch(action.type){
    case 'SHOW_SHEET':
      return {
        ...state,
        showSheet: true,
        item: action.item
      }
    case 'HIDE_SHEET':
      return{
        ...state,
        showSheet: false,
        item: null
      }
    default: 
      return state
  }
}