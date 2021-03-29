import React from "react";
import firebase from '../../config/fbConfig'
import { useAuthState } from 'react-firebase-hooks/auth';


export const FbContext = React.createContext();


export const FbProvider = ({ children }) => {

  const [FBuser] = useAuthState(firebase.auth());


  return (
    <FbContext.Provider value={{ FBuser }}>{children}</FbContext.Provider>
  );
};

