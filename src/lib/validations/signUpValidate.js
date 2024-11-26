import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters long.")
    .max(15, "First name cannot exceed 15 characters.")
    .required("First name is required."),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters long.")
    .max(15, "Last name cannot exceed 15 characters.")
    .required("Last name is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters long.")
    .max(20, "Password cannot exceed 20 characters.")
    .required("Password is required."),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
    .required("Phone number is required."),
  checkbox: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions.")
    .required("Accepting terms and conditions is required."),
});

export default validationSchema;
