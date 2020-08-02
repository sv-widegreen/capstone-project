import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import AddNewProjectTab from './components/AddNewProjectTab'
import FabricCalculatorTab from './components/FabricCalculatorTab'
import ProjectList from './components/ProjectList'
import ShoppingList from './components/ShoppingList'
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from './components/utils/handleLocalStorage'
import WelcomeScreen from './components/WelcomeScreen.js'

export default function App() {
  const [projectList, setProjectList] = useState([])

  useEffect(() => setProjectList(getFromLocalStorage('projects') || []), [])

  useEffect(() => saveToLocalStorage('projects', projectList), [projectList])

  return (
    <Switch>
      <Route exact path="/">
        <WelcomeScreen />
      </Route>
      <Route path="/shopping-list">
        <ShoppingList projectList={projectList} />
      </Route>
      <Route path="/projects">
        <ProjectList
          projectList={projectList}
          updateProjectData={updateProjectData}
        />
      </Route>
      <Route path="/add-new-project">
        <AddNewProjectTab onSubmit={addToProjectList} />
      </Route>
      <Route path="/fabric-calculator">
        <FabricCalculatorTab />
      </Route>
    </Switch>
  )

  function addToProjectList(projectData, event) {
    event.preventDefault()
    event.target.reset()
    event.target[0].focus()
    projectData.id = uuidv4()
    setProjectList([...projectList, projectData])
  }

  function updateProjectData(updatedData) {
    const projectIndex = projectList.findIndex(
      (project) => project.id === updatedData.id
    )
    let updatedProjectList = [...projectList]
    updatedProjectList[projectIndex] = updatedData
    setProjectList(updatedProjectList)
  }
}
