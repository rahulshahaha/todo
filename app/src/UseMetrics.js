import { useContext, useState, useEffect } from 'react';
import { DataContext } from './store/contexts/dataContext';
import { CompletedItemsContext } from './store/contexts/completedItemsContext';
import useFilteredItems from './UseFilteredItems'
import moment from 'moment'

export default function useMetrics() {

  const { items, weights, oneOffs } = useContext(DataContext)
  const { completedItems } = useContext(CompletedItemsContext)
  const filteredItems = useFilteredItems()

  //todays score
  const [todaysScore, setTodaysScore] = useState(0)
  useEffect(() => {
    const todaysItems = items ? items.filter(item => {
      return item.daysTo <= 0;
    }) : null;
    if(weights === null || oneOffs === undefined){
      setTodaysScore(0)
    }else{
      setTodaysScore(addScores(todaysItems) + (weights.oneOff * oneOffs.length));
    }
  }, [items, oneOffs, weights])

  //tomorrowsScore
  const [tomorrowsScore, setTomorrowsScore] = useState(0)
  useEffect(() => {
    const tomorrowsItems = items ? items.filter(item => { 
      return item.daysTo === 1;
    }) : null;
    setTomorrowsScore(addScores(tomorrowsItems))
  }, [items])

  //thisweeksScore
  const [thisWeeksScore, setThisWeeksScore] = useState(0)
  useEffect(() => {
    const thisWeeksItems = items ? items.filter(item => {
      return moment.unix(item.expectedUpdate.seconds).startOf('days').isBefore(getNextMonday())
    }) : null
    setThisWeeksScore(addScores(thisWeeksItems))
  }, [items])

  //completedToday
  const [completedScore, setCompletedScore] = useState(0)
  useEffect(() => {
    var completedScore = 0

    if(completedItems){
      completedItems.forEach(item => {
        if(item.scoreOnComplete !== undefined && moment.unix(item.completedDate.seconds).startOf('days').isSame(moment().startOf('days'))){
          completedScore += item.scoreOnComplete
        }
      })
    }
    setCompletedScore(completedScore)
  }, [completedItems])

  //filteredScore
  const [filteredScore, setFilteredScore] = useState(0)
  useEffect(() => {
    setFilteredScore(addScores(filteredItems))
  }, [filteredItems])


  const addScores = (itemsToAdd) => {
    if(itemsToAdd === null) return 0
    var score = 0
    itemsToAdd.forEach(item => {
      score += item.score
    })
    return score
  }

  const getNextMonday = () => {
    const currentCheck = moment().startOf('day').add(1,'d')
    var nextMonday = null;
    while (nextMonday === null){
      if(currentCheck.day() === 1){
        nextMonday = currentCheck
      }else{
        currentCheck.add(1,'d')
      }
    }
    return nextMonday;
  }

  return {todaysScore, tomorrowsScore, thisWeeksScore, completedScore, filteredScore};
}