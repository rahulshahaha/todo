
export const modalReducer = (state, action) => {
  switch(action.type){
    case 'SHOW_SHEET':
      return {
        ...state,
        showSheet: true,
        itemID: action.itemID,
        itemProjectID: action.itemProjectID
      }
    case 'SHOW_PROJECT_SHEET':
      return {
        ...state,
        showProjectSheet: true,
        projectID: action.projectID
      }
    case 'HIDE_SHEET':
      return{
        ...state,
        showSheet: false,
        itemID: null,
        itemProjectID: null
      }
    case 'HIDE_PROJECT_SHEET':
      return{
        ...state,
        showProjectSheet: false,
        projectID: null
      }
    case 'TOGGLE_CHART':
      return{
        ...state,
        showChart: !state.showChart
      }
    default: 
      return state
  }
}