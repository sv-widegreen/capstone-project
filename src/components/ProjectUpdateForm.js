import { yupResolver } from '@hookform/resolvers'
import isEqual from 'lodash.isequal'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import saveIcon from '../assets/saveIcon.svg'
import checkedCheckbox from '../assets/checkedCheckbox.svg'
import clearCheckbox from '../assets/clearCheckbox.svg'
import Button from './Button'
import InputField from './InputField'
import InputTextarea from './InputTextarea'
import { projectUpdateSchema } from './utils/projectUpdateSchema'

export default function ProjectUpdateForm({
  projectData,
  updateProjectData,
  setEditing,
}) {
  const [updatedData, setUpdatedData] = useState({ ...projectData })

  const {
    projectName,
    pattern,
    size,
    nextStep,
    notes,
    image,
    materialNeeds,
    materialsExisting,
    status,
  } = projectData

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(projectUpdateSchema),
    defaultValues: {
      projectName,
      pattern,
      size,
      nextStep,
      notes,
      materialNeeds,
      materialsExisting,
      status,
    },
  })

  const [loading, setLoading] = useState(false)
  const [newImage, setNewImage] = useState('')
  const [check, setCheck] = useState(status)

  return (
    <StyledForm onSubmit={handleSubmit(handleNewData)}>
      <StyledImageUpload>
        {image ? <p>Change the image:</p> : <p>Upload an image:</p>}
        <InputField
          labelText="Choose a file"
          placeholder="upload an image"
          type="file"
          name="image"
          registerFn={register}
          onChange={uploadImage}
        />
      </StyledImageUpload>

      {loading && <p className="loading">loading ...</p>}
      {image && !newImage && <StyledThumbnail src={image} />}
      {newImage && <StyledThumbnail src={newImage} />}

      <InputTextarea
        labelText="Next step:"
        name="nextStep"
        onChange={handleChange}
        registerFn={register}
        error={errors.nextStep}
        errorMessageMax="Don't make it too long"
      />

      <InputTextarea
        labelText="Notes:"
        name="notes"
        onChange={handleChange}
        registerFn={register}
        error={errors.notes}
        errorMessageMax="The text is too long unfortunately."
      />

      <InputField
        labelText="Project name:"
        name="projectName"
        onChange={handleChange}
        registerFn={register}
        error={errors.projectName}
        errorMessageMax="Make it short and sweet!"
        errorMessageRequired="Better keep a project name!"
      />

      <InputField
        labelText="Pattern:"
        name="pattern"
        placeholderText="Did you find a pattern?"
        onChange={handleChange}
        registerFn={register}
        error={errors.pattern}
        errorMessageMax="The text is too long..."
      />

      <InputField
        labelText="Size:"
        name="size"
        placeholderText="What's the size?"
        onChange={handleChange}
        registerFn={register}
        error={errors.size}
        errorMessageMax="The text is too long..."
      />

      <InputTextarea
        labelText="Materials I need:"
        name="materialNeeds"
        placeholderText="separate materials with a comma."
        onChange={handleChange}
        registerFn={register}
        error={errors.materialNeeds}
        errorMessageMax="Do you really need that much...?"
      />

      <InputTextarea
        labelText="Materials I have:"
        name="materialsExisting"
        placeholderText="separate materials with a comma."
        onChange={handleChange}
        registerFn={register}
        error={errors.materialsExisting}
        errorMessageMax="The text is too long...?"
      />
      <StyledCheckbox>
        <InputField
          labelText="Mark as done: "
          type="checkbox"
          name="status"
          registerFn={register}
          onChange={handleCheckbox}
        />
        {check ? (
          <img src={checkedCheckbox} alt="" />
        ) : (
          <img src={clearCheckbox} alt="" />
        )}
      </StyledCheckbox>
      <Button text="Save" size="30px" icon={saveIcon} />
    </StyledForm>
  )

  function handleChange(event) {
    setUpdatedData({ ...updatedData, [event.target.name]: event.target.value })
  }

  function handleCheckbox(event) {
    setCheck(!check)
    setUpdatedData({
      ...updatedData,
      [event.target.name]: event.target.checked,
    })
  }

  async function uploadImage(event) {
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'sewrly_upload')
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dun33qbbm/image/upload',
      { method: 'POST', body: data }
    )
    const newImage = await res.json()
    setNewImage(newImage.secure_url)
    setUpdatedData({ ...updatedData, image: newImage.secure_url })
    setLoading(false)
  }

  function handleNewData() {
    if (isEqual(updatedData, projectData)) {
      setEditing(false)
    } else {
      updateProjectData(updatedData)
      setEditing(false)
    }
  }
}

const StyledForm = styled.form`
  height: 458px;
  overflow: scroll;

  label {
    font-weight: 200;
    display: block;
    padding: 0;
    margin: 20px 0 0 6px;
  }

  input,
  textarea {
    font-weight: 200;
    color: var(--teal-light);
    background-color: white;
  }

  .loading {
    align-self: center;
    margin: 10px 0 10px 6px;
    color: var(--teal-light);
  }
`
const StyledImageUpload = styled.div`
  p {
    color: var(--teal-medium);
    font-size: 18px;
    font-weight: 200;
    margin: 10px 0 0 6px;
  }

  label {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: var(--copper-ultralight);
    font-size: 14px;
    color: var(--teal-light);
    box-shadow: 0 0 0 1pt var(--teal-ultralight);

    > [name='image'] {
      position: absolute;
      z-index: -1;
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
    }
  }
`
const StyledThumbnail = styled.img`
  width: auto;
  max-width: 300px;
  height: 80px;
  border-radius: 10px;
  border-style: none;
  align-self: center;
  object-fit: cover;
  margin: 10px 0 10px 6px;
`

const StyledCheckbox = styled.div`
  position: relative;
  padding-bottom: 10px;

  label {
    display: inline-block;
    position: relative;
    z-index: 1;
    width: 200px;
    padding-bottom: 30px;

    > [name='status'] {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 200px;
      height: 22px;
      opacity: 0;
    }
  }

  img {
    position: absolute;
    z-index: 0;
    top: 22px;
    right: 150px;
    width: 20px;
  }
`
