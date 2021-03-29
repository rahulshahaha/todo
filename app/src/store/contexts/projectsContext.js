import React, { useContext } from "react";
import firebase from '../../config/fbConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FbContext } from "./fbContext";


export const ProjectsContext = React.createContext();


export const ProjectsProvider = ({ children }) => {

  const { FBuser } = useContext(FbContext)
  const userID = FBuser ? FBuser.uid : null


  const [projects, projectsLoading] = useCollectionData(firebase.firestore().collection('users/' + userID + '/projects').where('deleted','==',false),{
    idField: 'id'
  })



  return (
    <ProjectsContext.Provider value={{ projects, projectsLoading }}>{children}</ProjectsContext.Provider>
  );
};

