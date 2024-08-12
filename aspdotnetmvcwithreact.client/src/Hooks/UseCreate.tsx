import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFetch from "./UseFetch";
import bookSchema from "../validation/bookValidation";

const UseCreate = () => {
  const navigate = useNavigate()
  const [initialValues] = useState({
      title: '',
      author: '',
      isbn: '',
      publicationDate: '',
      description: '',
      numberOfPages: '',
      genre: '',
      publisher: '',
      language: ''
  });

  const  { fetchData } = UseFetch()

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: bookSchema,
    initialValues: initialValues,
    onSubmit: values => {
      fetchData("BooksApi" , { method: 'post', data: values})
            .then(() => {
                navigate("/books")
            })
            .catch(error => {
                console.error('There was an error updating the book!', error);
            });
    },
  });

  const {handleChange, handleSubmit, values, errors} = formik;



  return {handleChange, handleSubmit, values, errors};
}
export default UseCreate