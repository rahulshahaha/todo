
function useProjectScore(projects, items) {

  var newProjects = [];
  if(projects && items){
    newProjects = projects.map(proj => {
      const itemsInProj = items.filter(item => {
        if(!item.project) return false
        return item.project.id === proj.id
      })
      var projScore = 0;
      itemsInProj.forEach(item => projScore += item.score)
      return {...proj, totalScore: projScore}
    })
  }else{
    return projects
  }

  return newProjects;
}

export default useProjectScore