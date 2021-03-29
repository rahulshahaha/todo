
export const dataReducer = (state, action) => {
  switch(action.type){
    case 'SET_DATA':
      return{
        ...state,
        items: action.data.items,
        projects: action.data.projects,
        weights: action.data.weights,
        totalScore: action.data.totalScore,
        allDataPulled: action.data.allDataPulled
      }
    case 'SET_HISTORY':
      return{
        ...state,
        history: action.history
      }
    case 'SET_ONE_OFFS':
      return{
        ...state,
        oneOffs: action.oneOffs
      }
    case 'SET_ALL_LOADED':
      return{
        ...state,
        allLoaded: action.allLoaded
      }
    default: 
      return state
  }
}