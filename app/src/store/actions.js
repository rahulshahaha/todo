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
  firebase.firestore().collection('items').add({
    action: '',
    actionType: 1,
    description: '',
    expectedUpdate: null,
    importance: 1,
    name: 'NewName',
    notes: '',
    userID,
    deleted: false
  })
}

export const deleteItem = (itemID) => {
  firebase.firestore().collection('items').doc(itemID).update({
    deleted: true
  })
}

export const updateImportanceTypes = (newITypes) => {
  firebase.firestore().collection('users').doc(currentUserID()).get().then(userDoc => {
    var currentWeights = JSON.parse(userDoc.data().weights)
    var currentITypes = currentWeights.importanceTypes
    for(var i = 0; i < newITypes.length; i++){
      if(!isNaN(parseFloat(newITypes[i].weight))){
        for(var j = 0; j < currentITypes.length; j++){
          if(currentITypes[j].id === newITypes[i].id){
            console.log('t')
            currentITypes[j] = {
              ...currentITypes[j],
              weight: parseFloat(newITypes[i].weight)
            }
          }
        }
      }
    }
    currentWeights.importanceTypes = currentITypes;
    firebase.firestore().collection('users').doc(currentUserID()).update({
      weights: JSON.stringify(currentWeights)
    }).then(t => {
      window.location.reload();
    })
  })
}

const currentUserID = () => {
  return firebase.auth().currentUser.uid
}