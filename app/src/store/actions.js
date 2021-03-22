import firebase from '../config/fbConfig'


export const updateName = (newName, itemID) => {
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemID).update({
    name: newName
  })
}

export const updateImportance = (importance, itemID) => {
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemID).update({
    importance: parseInt(importance)
  })
}

export const updateDescription = (newDesription, itemID) => {
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemID).update({
    description: newDesription
  })
}

export const updateNotes = (newNotes, itemID) => {
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemID).update({
    notes: newNotes
  })
}

export const updateActionType = (newActionType, itemID) => {
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemID).update({
    actionType: parseInt(newActionType)
  })
}

export const updateAction = (newAction, itemID) => {
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemID).update({
    action: newAction
  })
}

export const updateExpectedUpdate = (newExpectedUpdate, itemID) => {
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemID).update({
    expectedUpdate: newExpectedUpdate
  })
}

export const completeOneOff = (id) => {
  firebase.firestore().collection('users/' + currentUserID() + '/oneOffs').doc(id).update({
    done: true
  })
}

export const addOneOff = (oneOff) => {
  const userID = currentUserID()
  firebase.firestore().collection('users/' + currentUserID() + '/oneOffs').add({
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

export const addNewItem = (dispatch) => {
  const userID = currentUserID()
  firebase.firestore().collection('users/' + currentUserID() + '/items').add({
    action: '',
    actionType: 1,
    description: '',
    expectedUpdate: null,
    importance: 1,
    name: 'NewName',
    notes: '',
    userID,
    deleted: false,
    new: true
  }).then(newItem => {
    dispatch({type:'SHOW_SHEET',itemID:newItem.id})
  })
}

export const deleteItem = (itemID) => {
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemID).update({
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

export const logHistory = (newScore) => {
  const now = new Date()
  firebase.firestore().collection('users').doc(currentUserID()).get().then(userDoc => {
    if(userDoc.data().currentScore.toFixed(2) !== newScore.toFixed(2)){
      console.log('log history. current:', userDoc.data().currentScore, 'new', newScore)
      firebase.firestore().collection('users').doc(currentUserID()).update({
        currentScore: parseFloat(newScore.toFixed(2))
      }).then(t => {
        firebase.firestore().collection('users/' + currentUserID() + '/history').add({
          date: now,
          score: parseFloat(newScore.toFixed(2))
        })
      })
    }
  })

}

export const updateItem = (newItem) => {
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(newItem.id).update({
    action: newItem.action,
    actionType: parseInt(newItem.actionType),
    description: newItem.description,
    expectedUpdate: newItem.expectedUpdate,
    importance: parseInt(newItem.importance),
    name: newItem.name,
    new: false
  })
}

const currentUserID = () => {
  return firebase.auth().currentUser.uid
}