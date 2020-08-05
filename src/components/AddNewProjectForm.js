import { yupResolver } from '@hookform/resolvers'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import addIcon from '../assets/addIcon.svg'
import Button from './Button'
import InputField from './InputField'
import InputTextarea from './InputTextarea'
import { projectSchema } from './utils/projectSchema.js'

export default function AddNewProjectForm({ addToProjectList }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(projectSchema),
  })

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')

  return (
    <StyledForm onSubmit={handleSubmit(handleInputs)}>
      <p>Required info:</p>
      <StyledInputGroup>
        <InputField
          labelText="Project Name"
          placeholderText="type here"
          name="projectName"
          registerFn={register}
          error={errors.projectName}
          errorMessageMax="Make it short and sweet!"
          errorMessageRequired="Surely you can think of a name for your project!"
        />

        <InputField
          labelText="What's the next step?"
          placeholderText="e.g. buy materials, cut fabric, sew ..."
          name="nextStep"
          registerFn={register}
          error={errors.nextStep}
          errorMessageMax="Please keep it short!"
          errorMessageRequired="This is the reason why you are using this app!"
        />
      </StyledInputGroup>

      <p className="optional">Optional info (you can add them later): </p>
      <StyledInputGroup>
        <InputField
          labelText="Upload an image:"
          placeholder="upload an image"
          type="file"
          name="image"
          registerFn={register}
          onChange={uploadImage}
        />

        {loading ? (
          <p className="loading">loading ...</p>
        ) : (
          <StyledThumbnail src={image} />
        )}

        <InputField
          labelText="Where did you find the pattern?"
          placeholderText="or did you draft it yourself?"
          name="pattern"
          registerFn={register}
          error={errors.pattern}
          errorMessageMax="The text is too long unfortunately."
        />

        <InputField
          labelText="If there's a size, which one?"
          placeholderText="type here"
          name="size"
          registerFn={register}
          error={errors.size}
          errorMessageMax="Please cut the size of this text!"
        />

        <InputTextarea
          labelText="Materials I have:"
          placeholderText="separate materials with a comma"
          name="materialNeeds"
          registerFn={register}
          error={errors.materialNeeds}
          errorMessageMax="The text is too long ...?"
        />

        <InputTextarea
          labelText="Materials I need:"
          placeholderText="separate materials with a comma"
          name="materialsExisting"
          registerFn={register}
          error={errors.materialsExisting}
          errorMessageMax="Do you really need that much ...?"
        />
      </StyledInputGroup>

      <Button icon={addIcon} size="50px" />
    </StyledForm>
  )

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
    const image = await res.json()
    setImage(image.secure_url)
    setLoading(false)
  }

  function handleInputs(projectData, event) {
    event.preventDefault()
    projectData.id = uuidv4()
    projectData.image = image
    addToProjectList(projectData)
    event.target.reset()
    setImage('')
    event.target[0].focus()
  }
}

const StyledForm = styled.form`
  display: flex;
  flex-flow: column;
  height: 446px;
  overflow: scroll;
  padding: 0 0 20px 0;

  p {
    color: var(--teal-ultralight);
    font-size: 14px;
    font-weight: 300;
    margin: 0 0 0 6px;
  }

  .optional {
    margin: 40px 0 0 6px;
  }

  .loading {
    align-self: center;
    margin: 20px 0;
  }

  button {
    margin: 0 auto;

    img {
      margin: 10px 0;
    }
  }
`
const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  padding: 15px 10px;
  width: 300px;
  align-self: center;
`

const StyledThumbnail = styled.img`
  width: auto;
  max-width: 300px;
  height: 100px;
  border-radius: 10px;
  border-style: none;
  align-self: center;
  object-fit: cover;
`
