import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import editIcon from '../assets/editIcon.svg'
import Button from './Button'
import Headline from './Headline'
import LogoHeader from './LogoHeader'
import NavigationBar from './NavigationBar'
import ProjectUpdateForm from './ProjectUpdateForm'

export default function ProjectDetailsTab({ projectList, updateProjectData }) {
  const [isEditing, setEditing] = useState(false)
  const { id } = useParams()
  const projectData = projectList.find((project) => id === project.id)

  const {
    projectName,
    pattern,
    size,
    nextStep,
    materialNeeds,
    materialsExisting,
  } = projectData

  return (
    <>
      <LogoHeader />
      <StyledTab>
        <Headline headlineText={projectName} textColor={'var(--teal-medium)'} />
        <StyledProject>
          {isEditing ? (
            <>
              <ProjectUpdateForm
                projectData={projectData}
                updateProjectData={updateProjectData}
                setEditing={setEditing}
              />
            </>
          ) : (
            <div>
              <p name="nextStepTitle">Next step:</p>
              <p name="nextStep">{nextStep}</p>

              {pattern ? <p name="pattern">{pattern}</p> : ''}
              {size ? <p name="size">Size: {size}</p> : ''}
              {materialNeeds ? (
                <p name="materials">
                  Materials I need: <br></br>
                  {materialNeeds}
                </p>
              ) : (
                ''
              )}
              {materialsExisting ? (
                <p name="materials">
                  Materials I have: <br></br>
                  {materialsExisting}
                </p>
              ) : (
                ''
              )}
              <Button
                size="30px"
                icon={editIcon}
                onClick={() => setEditing(true)}
              />
            </div>
          )}
        </StyledProject>
      </StyledTab>
      <NavigationBar />
    </>
  )
}

const StyledTab = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  margin-top: -20px;
  padding: 0 30px 50px 30px;
  background: var(--copper-ultralight);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -1px 3px -1px rgba(0, 0, 0, 0.3);

  p {
    color: var(--teal-medium);
    font-size: 16px;
    padding: 20px 0;
  }
`
const StyledProject = styled.li`
  position: relative;
  list-style: none;
  width: 300px;
  border-radius: 10px;
  background: var(--copper-ultralight);
  margin: 20px 20px 0 20px;

  p {
    font-weight: 200;
    width: 260px;
    overflow-wrap: break-word;
    padding: 0 24px;
    color: var(--teal-light);
    font-size: 16px;

    &[name='projectName'] {
      padding: 12px 24px 10px 24px;
      color: var(--teal-dark);
      font-size: 20px;
    }

    &[name='nextStepTitle'] {
      margin-top: 10px;
      color: var(--teal-medium);
    }

    &[name='nextStep'] {
      color: var(--teal-light);
    }

    &[name='materials'] {
      padding: 0 24px 14px 24px;
    }
  }

  button {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`
