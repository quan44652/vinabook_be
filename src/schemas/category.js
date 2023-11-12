import yup from 'yup'

export const categorySchema = new yup.object({
    name: yup.string().required()
})