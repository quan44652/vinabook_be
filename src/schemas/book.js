import yup from 'yup'

export const bookSchema = new yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    author: yup.string().required(),
    image: yup.string().required(),
    price: yup.number().required(),
    categoryId: yup.string().required()
})