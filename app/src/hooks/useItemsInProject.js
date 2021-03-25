
function useItemsInProject(project, items, isNew) {

  if(isNew) return null

  if(project && items){
    return items.filter(item => {
      return item.projectID === project.id
    })
  }else{
    return null
  }

}

export default useItemsInProject