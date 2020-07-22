import React from 'react'
import styled from 'styled-components'
import addButton from '../assets/addButton.svg'
import Button from './Button'
import Headline from './Headline'
import ProjectListItem from './ProjectListItem'

export default function ProjectList({
  projectList,
  updateProjectData,
  renderAddNewProjectTab,
}) {
  return (
    <StyledTab>
      <Headline
        headlineText={'Projects'}
        textColor={'var(--copper-ultralight)'}
      />
      <StyledProjectList>
        {projectList.map((projectData) => (
          <ProjectListItem
            key={projectData.id}
            projectData={projectData}
            updateProjectData={updateProjectData}
          />
        ))}
      </StyledProjectList>
      <Button icon={addButton} onClick={renderAddNewProjectTab} />
    </StyledTab>
  )
}

const StyledTab = styled.main`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin-top: -20px;
  background: var(--copper-gradient);
  min-height: 556px;
  border-radius: 20px 20px 0 0;
`

const StyledProjectList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`
