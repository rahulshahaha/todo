import React, { useReducer } from "react";
import { modalReducer } from '../reducers/modalReducer'

export const ModalContext = React.createContext();


export const ModalProvider = ({ children }) => {

  const [modalStatus, modalDispatch] = useReducer(modalReducer, {
    showSheet: false,
    showProjectSheet: false,
    itemID: null
  });




  return (
    <ModalContext.Provider value={{ modalStatus, modalDispatch }}>{children}</ModalContext.Provider>
  );
};

