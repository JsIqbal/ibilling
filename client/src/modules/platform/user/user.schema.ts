import { string, object } from "yup";

export const loginSchema = object().shape({
    email: string().required("Invalid email"),
    password: string().required("Required"),
});
