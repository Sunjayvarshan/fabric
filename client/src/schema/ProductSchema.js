import * as yup from "yup";

export const basicSchema = yup.object().shape({
  name: yup.string().required("Required"),
  price: yup.number().positive().integer().required("Required"),
  quantity: yup
    .number()
    .positive()
    .integer()
    .required("we need to know how much we can sell"),
  description: yup
    .string()
    .required("we need information to host this product"),
});
