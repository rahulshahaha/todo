
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
    default: 
      return state
  }
}