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
  firebase.firestore().collection('oneOffs').add({
    name: oneOff,
    done: false
  })
}