import React, { useContext } from "react";
import firebase from '../../config/fbConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FbContext } from "./fbContext";


export const OneOffsContext = React.createContext();


export const OneOffsProvider = ({ children }) => {

  const { FBuser } = useContext(FbContext)
  const userID = FBuser ? FBuser.uid : null


  const [oneOffs, oneOffsLoading] = useCollectionData(firebase.firestore().collection('users/'+ userID +'/oneOffs').where('done','==',false), {
    idField: 'id'
  });



  return (
    <OneOffsContext.Provider value={{ oneOffs, oneOffsLoading }}>{children}</OneOffsContext.Provider>
  );
};

