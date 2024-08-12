import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

interface Options {
  method: 'post' | 'get'| 'put' | 'delete' | 'patch';
  data?: Record<string, string>
  config?:Record<string, string>
}

interface Error {
  response?: {
    data?: Record<string, string> | string;
    status: number;
    title: string;
  };
  message: unknown;
}

const UseFetch = () => {
  const [data, setData] = useState<Record<string, string>>({});
  const [error, setError] = useState<Error | null | string>(null);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AppContext);

  const authToken = token || localStorage.getItem('authToken')

  const api = axios.create({
    baseURL: 'http://localhost:5168/api/', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json', // Wrap the key in quotes
        'Authorization': `Bearer ${authToken ? authToken : "" }`  // Wrap the key in quotes
    }
  });

  api.interceptors.response.use(
    response => response,  async error =>  {
      const originalRequest = error.config;

      if (error.response.status === 401) {
        originalRequest._retry = true;

        try {
          const data = await refreshAuthToken();
          const newAuthToken = data.token;

          localStorage.setItem('authToken', newAuthToken)

          // Update the Authorization header with the new token
          api.defaults.headers['Authorization'] = `Bearer ${newAuthToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAuthToken}`;

          return api(originalRequest);
        }  catch (refreshError) {
          // Handle the case where refreshing the token fails (e.g., redirect to login)
          console.error('Token refresh failed:', refreshError);
          // Optionally, redirect to login page or clear stored tokens
          return Promise.reject(refreshError);
          }

      }
    }
  )

  const refreshAuthToken = async () => {
    console.log(authToken, "yiyiyiyyyyi")
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        const response = await api.get('AuthApi/refresh-token')

        return response.data; // Assuming the response contains the new token and refresh token
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error; // Handle this case if the refresh token fails
    }
 };

  const fetchData = useCallback(async (url="", options: Options) => {
    // const responses = await api.post("/api/Authapi/login", options.body)

    const { method, data, config} = options;
    
    try {
      setLoading(true);
      setError(null);
      console.log("fetch")
      const response = await api({
        method: method ? method : 'get',
        url,
        data,
        ...config
      });

      console.log(response);

      if(response.status == 200) {
        setData(response.data);
        console.log(response);
        setLoading(false)
      }
      return response.data;
    } catch (error) {
      const erro = error as unknown as Error
      const errMsa: string =  typeof erro?.response?.data == "string"  ? erro.response?.data as string : `${erro.message}:  ${erro.response?.data?.title}` as string
      // console.log(erro.message);
      console.log(errMsa)
      setError(errMsa) //major error
      setLoading(false);
      // console.error('Error:',  err, erro.response?.status, erro.message, erro.response?.data); 
      // throw new Error(erro.message as string);
    }
  }, [api] )


  return { data, error, loading, fetchData }
}
export default UseFetch