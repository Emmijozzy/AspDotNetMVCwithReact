import { useFormik } from "formik";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../Auth/authInterface";
import UseFetch from "../Hooks/UseFetch";
import { registrationSchema } from "../validation/registrationSchema";

const initialValues: Register  = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const UserRegister = () => {
  const effectRan = useRef(false);
  const [resErrMes, setResErrMes] = useState("")

  const navigate = useNavigate();
  
  const { data, error, loading, fetchData }  = UseFetch();

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        await fetchData("AuthApi/register", {method: 'post', data: {...values}});
      } catch (e) {
        const error = e ;
        console.log(error, e);
      } 
    },
  });

  useEffect(() => {
    if (effectRan.current || process.env.NODE_ENV !== "development") {
      if ( typeof data.message == "string") {
        console.log(data);
        navigate("/Auth/login");
      } else {
        setResErrMes(error as string);
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, [data, error]);

  const { handleSubmit, handleBlur, handleChange, errors, values } = formik;

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
   loading,
   resErrMes
  };
};
export default UserRegister;
