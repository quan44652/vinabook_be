import yup from 'yup'

export const feedbackSchema = new yup.object({
    userId: yup.string().required(),
    bookId: yup.string().required(),
    content: yup.string().required(),
})