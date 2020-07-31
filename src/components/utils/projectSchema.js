import * as yup from 'yup'

export const projectSchema = yup.object().shape({
  projectName: yup.string().max(25).required(),
  nextStep: yup.string().max(50).required(),
  pattern: yup.string().max(35),
  size: yup.string().max(25),
  materialNeeds: yup.string().max(200),
  materialsExisting: yup.string().max(200),
})
