import React from 'react'
import styled from 'styled-components'
import Headline from './Headline'
import ProjectListItem from './ProjectListItem'

export default function ProjectTab({ projectList }) {
  return (
    <StyledTab>
      <Headline
        headlineText={'Projects'}
        textColor={'var(--copper-ultralight)'}
      />
      <StyledProjectList>
        <ProjectListItem projectList={projectList} />
      </StyledProjectList>
    </StyledTab>
  )
}

const StyledTab = styled.main`
  background: var(--copper-gradient);
  max-width: 667px;
  min-height: 556px;
  border-radius: 20px 20px 0 0;
`

const StyledProjectList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`
