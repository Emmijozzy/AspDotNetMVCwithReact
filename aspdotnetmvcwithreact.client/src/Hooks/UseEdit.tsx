import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UseFetch from "../Hooks/UseFetch";
import bookSchema from "../validation/bookValidation";

const UseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
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

  const  {error, fetchData } = UseFetch()

  useEffect(() => {
    const fetchInitial = async () => {
      await fetchData("BooksApi/"+id , { method: 'get'})
      .then((data) => {
        console.log(data);
        if (data) return data;
      })
      .then((initialData) => {
        setInitialValues(initialData);
        formik.setValues(initialData);
      })
      .catch(err => {
          console.log(error)
          console.error('There was an error fetching the book!', err);
      });
    }
    fetchInitial();

    
  }, [id]);

  console.log(initialValues);

  
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: bookSchema,
    initialValues: initialValues,
    onSubmit: values => {
      fetchData("BooksApi/"+id , { method: 'put', data: values})
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
export default UseEdit