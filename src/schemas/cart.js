import yup from 'yup'

const cartSchema = new yup.object({
    userId: yup.string().required(),
    bookId: yup.string().required(),
    quantity: yup.number().required(),
})

export default cartSchema