import { useEffect, useContext, useState } from 'react';
import firebase from './config/fbConfig'
import { FbContext } from './store/contexts/fbContext';


export default function useHistory(projectID) {

  const [items,setItems] = useState([])
  const { FBuser } = useContext(FbContext)
  const userID = FBuser ? FBuser.uid : null


  useEffect(() => {
    const unsubCompleted = firebase.firestore().collection('users/' + userID + '/items').where('deleted','==',false).where('completed','==',true).where('projectID','==',projectID).orderBy("completedDate","desc").limit(5).onSnapshot(snap => {
      const newItems = []
      snap.docs.forEach(doc => {
        newItems.push({...doc.data(),id:doc.id, score:doc.data().scoreOnComplete, expectedUpdate: doc.data().completedDate })
      })
      // newItems.sort((a,b) => { return b.score - a.score })
      setItems(newItems)
    })
    return () => {
      unsubCompleted()
    }
  }, [projectID, userID])


  return items;
}