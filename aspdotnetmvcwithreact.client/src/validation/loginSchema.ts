import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const loginSchema = Yup.object().shape({
  userName: Yup.string().min(3, "Username must be at least 3 characters long").trim().required("Username is Required"),
  password: Yup.string().password().trim().required("Password Required"),
});

export default loginSchema;