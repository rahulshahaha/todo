import React from "react";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import firebase from '../../config/fbConfig'


export const ConfigContext = React.createContext();


export const ConfigProvider = ({ children }) => {

  const docRef = firebase.firestore().collection('config').doc('2TttT72yuM5PAvGMjgJT')

  const [config, loading] = useDocumentData(docRef);


  return (
    <ConfigContext.Provider value={{ config, configLoading: loading }}>{children}</ConfigContext.Provider>
  );
};

