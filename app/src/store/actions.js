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
  const now = new Date()
  firebase.firestore().collection('users/' + currentUserID() + '/oneOffs').add({
    name: oneOff,
    done: false,
    userID,
    created: now
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

export const addNewItem = (newItem) => {
  const now = new Date()
  firebase.firestore().collection('users/' + currentUserID() + '/items').add({
    action: newItem.action,
    actionType: parseInt(newItem.actionType),
    expectedUpdate: newItem.expectedUpdate,
    deleted: false,
    completed: false,
    projectID: newItem.projectID,
    created: now
  })
}

export const deleteItem = (itemID, items, weights) => {
  const item = items.filter(i => {
    return i.id === itemID
  })[0]
  const now = new Date()
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemID).update({
    deleted: true,
    deletedDate: now,
    actionTypeWeightEnd: item.actionTypeWeight,
    importanceWeightEnd: item.importanceWeight,
    dayDropEnd: item.dayDrop,
    scoreOnDelete: item.score
  })
}

export const completeItem = (itemID, items, weights) => {
  const item = items.filter(i => {
    return i.id === itemID
  })[0]
  const now = new Date()
  firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemID).update({
    completed: true,
    completedDate: now,
    actionTypeWeightEnd: item.actionTypeWeight,
    importanceWeightEnd: item.importanceWeight,
    dayDropEnd: item.dayDrop,
    scoreOnComplete: item.score
  })
}

export const updateImportanceTypes = (newITypes, oldITypes) => {
  const keys = Object.keys(newITypes)
  for (const key of keys) {
    if(!isNaN(parseFloat(newITypes[key].weight))){
      oldITypes[key] = {
        ...newITypes[key],
        weight: parseFloat(newITypes[key].weight)
      }
    }
  }
  firebase.firestore().collection('users').doc(currentUserID()).get().then(userDoc => {
    firebase.firestore().collection('users').doc(currentUserID()).update({
      importanceTypes: oldITypes
    })
  })
}

export const updateActionTypes = (newATypes, oldATypes) => {
  const keys = Object.keys(newATypes)
  for (const key of keys) {
    if(!isNaN(parseFloat(newATypes[key].weight))){
      oldATypes[key] = {
        ...newATypes[key],
        weight: parseFloat(newATypes[key].weight)
      }
    }
  }
  firebase.firestore().collection('users').doc(currentUserID()).get().then(userDoc => {
    firebase.firestore().collection('users').doc(currentUserID()).update({
      actionTypes: oldATypes
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
    expectedUpdate: newItem.expectedUpdate,
    projectID: newItem.projectID
  })
}

export const addImportance = (importanceTypes) => {
  const keys = Object.keys(importanceTypes)
  const newID = keys.length + 1;
  const newKey = "importanceTypes." + newID
  firebase.firestore().collection('users').doc(currentUserID()).update({
    [newKey]: {id: newID, name: "New", weight: 0}
  })
}

export const addActionType = (actionTypes) => {
  const keys = Object.keys(actionTypes)
  const newID = keys.length + 1;
  const newKey = "actionTypes." + newID
  firebase.firestore().collection('users').doc(currentUserID()).update({
    [newKey]: {id: newID, name: "New", weight: 0}
  })
}

export const updateProject = (newProject) => {
  firebase.firestore().collection('users/' + currentUserID() + '/projects').doc(newProject.id).update({
    description: newProject.description,
    importance: parseInt(newProject.importance),
    name: newProject.name
  })
}

export const addProject = (newProject) => {
  firebase.firestore().collection('users/' + currentUserID() + '/projects').add({
    description: newProject.description,
    importance: parseInt(newProject.importance),
    name: newProject.name,
    deleted: false
  })
}

export const deleteProject = (projectID) => {
  const projectRef = firebase.firestore().collection('users/' + currentUserID() + '/projects').doc(projectID)
  projectRef.update({
    deleted: true
  }).then(t => {
    firebase.firestore().collection('users/' + currentUserID() + '/items').where('project','==',projectID).where('deleted','!=',true).get().then(itemSnap => {

      var batch = firebase.firestore().batch();

      itemSnap.docs.forEach(itemDoc => {
        var itemRef = firebase.firestore().collection('users/' + currentUserID() + '/items').doc(itemDoc.id)
        batch.update(itemRef, {"deleted": true});
      })

      // Commit the batch
      batch.commit()
    })
  })
}

const currentUserID = () => {
  return firebase.auth().currentUser.uid
}