import yup from 'yup'

const orderSchema = new yup.object({
    userId: yup.string().required(),
    name: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
})

export default orderSchema