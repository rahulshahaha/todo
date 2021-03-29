import React, { useContext } from "react";
import firebase from '../../config/fbConfig'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { FbContext } from "./fbContext";


export const WeightsContext = React.createContext();


export const WeightsProvider = ({ children }) => {

  const { FBuser } = useContext(FbContext)
  const userID = FBuser ? FBuser.uid : null


  const [userData, weightsLoading] = useDocumentData(firebase.firestore().collection('users').doc("/" + userID))

  const actionTypes = userData && userData.actionTypes ? userData.actionTypes : null;
  const dayDrop = userData && userData.dayDrop ? userData.dayDrop : null;
  const importanceTypes = userData && userData.importanceTypes ? userData.importanceTypes : null;
  const oneOff = userData && userData.oneOff ? userData.oneOff : null;
  const currentUserScore = userData && userData.currentScore ? userData.currentScore : null;

  const weights = actionTypes && dayDrop && importanceTypes && oneOff ? {
    actionTypes,
    dayDrop,
    importanceTypes,
    oneOff,
    currentUserScore
  } : null


  return (
    <WeightsContext.Provider value={{ weights, weightsLoading }}>{children}</WeightsContext.Provider>
  );
};

