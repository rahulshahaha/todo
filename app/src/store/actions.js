import firebase from '../config/fbConfig'


export const updateName = (newName, itemID) => {
  firebase.firestore().collection('items').doc(itemID).update({
    name: newName
  })
}

export const updateImportance = (importance, itemID) => {
  firebase.firestore().collection('items').doc(itemID).update({
    importance: parseInt(importance)
  })
}

export const updateDescription = (newDesription, itemID) => {
  firebase.firestore().collection('items').doc(itemID).update({
    description: newDesription
  })
}

export const updateNotes = (newNotes, itemID) => {
  firebase.firestore().collection('items').doc(itemID).update({
    notes: newNotes
  })
}

export const updateActionType = (newActionType, itemID) => {
  firebase.firestore().collection('items').doc(itemID).update({
    actionType: parseInt(newActionType)
  })
}

export const updateAction = (newAction, itemID) => {
  firebase.firestore().collection('items').doc(itemID).update({
    action: newAction
  })
}

export const updateExpectedUpdate = (newExpectedUpdate, itemID) => {
  firebase.firestore().collection('items').doc(itemID).update({
    expectedUpdate: newExpectedUpdate
  })
}

export const completeOneOff = (id) => {
  firebase.firestore().collection('oneOffs').doc(id).update({
    done: true
  })
}

export const addOneOff = (oneOff) => {
  const userID = currentUserID()
  firebase.firestore().collection('oneOffs').add({
    name: oneOff,
    done: false,
    userID
  })
}

export const login = (email, pass) => {
  firebase.auth().signInWithEmailAndPassword(
    email,
    pass
  )
}

export const logout = () => {
  firebase.auth().signOut()
}

export const addNewItem = () => {
  const userID = currentUserID()
  const now = new Date(new Date().getFullYear() + 1,new Date().getMonth() , new Date().getDate());
  firebase.firestore().collection('items').add({
    action: '',
    actionType: 1,
    description: '',
    expectedUpdate: now,
    importance: 1,
    name: 'NewName',
    notes: '',
    userID
  })
}

const currentUserID = () => {
  return firebase.auth().currentUser.uid
}