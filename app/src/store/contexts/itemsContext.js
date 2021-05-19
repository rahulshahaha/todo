import React, { useContext } from "react";
import firebase from '../../config/fbConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FbContext } from "./fbContext";


export const ItemsContext = React.createContext();


export const ItemsProvider = ({ children }) => {

  const { FBuser } = useContext(FbContext)
  const userID = FBuser ? FBuser.uid : null


  const [items, itemsLoading] = useCollectionData(firebase.firestore().collection('users/' + userID + '/items').where('deleted','==',false).where('completed','==',false),{
    idField: 'id'
  })




  return (
    <ItemsContext.Provider value={{ items, itemsLoading }}>{children}</ItemsContext.Provider>
  );
};

