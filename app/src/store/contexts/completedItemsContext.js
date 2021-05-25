import React, { useContext } from "react";
import firebase from '../../config/fbConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FbContext } from "./fbContext";


export const CompletedItemsContext = React.createContext();


export const CompltetedItemsProvider = ({ children }) => {

  const { FBuser } = useContext(FbContext)
  const userID = FBuser ? FBuser.uid : null


  const [completedItems, completedItemsLoading] = useCollectionData(firebase.firestore().collection('users/' + userID + '/items').where('deleted','==',false).where('completed','==',true),{
    idField: 'id'
  })




  return (
    <CompletedItemsContext.Provider value={{ completedItems, completedItemsLoading }}>{children}</CompletedItemsContext.Provider>
  );
};

