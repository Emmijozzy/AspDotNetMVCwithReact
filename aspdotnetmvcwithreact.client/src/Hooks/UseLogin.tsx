import { useFormik } from "formik";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../Auth/authInterface";
import loginSchema from "../validation/loginSchema";
import UseFetch from "../Hooks/UseFetch";
import { AppContext } from "../context/AppContext";

const initialValues: Login  = {
  userName: "",
  password: "",
};

const UserLogin = () => {
  const effectRan = useRef(false);

  const navigate = useNavigate();

  const { setToken, setAppUser } = useContext(AppContext)
  const [ userName, setUserName] = useState<string>()
  
  const { data, error, loading, fetchData }  = UseFetch();

  const [resData, setResData] = useState<unknown>(null);
  const [resErrMes, setResErrMes] = useState("")

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await fetchData("AuthApi/login", {method: 'post', data: {...values}});
        setUserName(values.userName)
      } catch (e) {
        const error = e ;
        console.log(error);
      } 
    },
  });

  useEffect( () => {
    if (error) {
      console.log(error)
      // throw new Error(error as string);
      setResErrMes(error as string);
    } else {
      if (data.token) {
        // console.log(data.token)
        setAppUser!(userName as string)
        setResData(data);
        const token :string = data.token ? data.token : ""
        localStorage.setItem('authToken', token)
        localStorage.setItem('appUser', userName as string)
        setToken!(token)
        navigate("/Books")
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
    resData,
    resErrMes
  };
};
export default UserLogin;