import React, { useEffect, useContext } from 'react'
import { DataContext } from '../store/contexts/dataContext'
import { hydrateData } from '../store/hydrateData'
import { ItemsContext } from '../store/contexts/itemsContext'
import { OneOffsContext } from '../store/contexts/oneOffsContext'
import { ProjectsContext } from '../store/contexts/projectsContext'
import { WeightsContext } from '../store/contexts/weightsContext'
import { HistoryContext } from '../store/contexts/historyContext'


const DataHydrator = () => {

  const { items, itemsLoading } = useContext(ItemsContext)
  const { oneOffs, oneOffsLoading } = useContext(OneOffsContext)
  const { projects, projectsLoading } = useContext(ProjectsContext)
  const { weights, weightsLoading } = useContext(WeightsContext)
  const { history, historyLoading } = useContext(HistoryContext)
  const { dataDispatch } = useContext(DataContext)

  const allLoaded = !itemsLoading && !oneOffsLoading && !projectsLoading && !weightsLoading && !historyLoading ? true : false;


  useEffect(() => {
    if(allLoaded){
      console.log('data effect')
      dataDispatch({type: 'SET_DATA', data: hydrateData(items, weights, projects, oneOffs)})
    }
  }, [items, projects, weights, oneOffs, dataDispatch, allLoaded])

  useEffect(() => {
    console.log('history effect')
    dataDispatch({type: 'SET_HISTORY', history: history})
  },[dataDispatch, history])

  useEffect(() => {
    console.log('oneoff effect')
    dataDispatch({type: 'SET_ONE_OFFS', oneOffs: oneOffs})
  },[dataDispatch, oneOffs])

  useEffect(() => {
    console.log('all loaded effect')
    dataDispatch({type: 'SET_ALL_LOADED', allLoaded: allLoaded})
  }, [allLoaded, dataDispatch])



  return ( 
    <div></div>
   );
}
 
export default DataHydrator;