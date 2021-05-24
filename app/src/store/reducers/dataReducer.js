
export const dataReducer = (state, action) => {
  switch(action.type){
    case 'SET_DATA':
      return{
        ...state,
        items: action.data.items,
        projects: action.data.projects,
        weights: action.data.weights,
        totalScore: action.data.totalScore,
        todaysScore: action.data.todaysScore,
        tomorrowsScore: action.data.tomorrowsScore,
        thisWeeksScore: action.data.thisWeeksScore,
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