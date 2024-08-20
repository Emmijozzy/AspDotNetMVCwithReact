import { useEffect, useState } from "react";
import UseFetch from "../Hooks/UseFetch"
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [logined, setLogined] = useState(false);
  const [logoutErr, setLogotErr] = useState("")
  const { data, error, fetchData } = UseFetch();

  const navigate = useNavigate();
  const location = useLocation();



  const handlerLogout = () => {
    const authToken = localStorage.getItem("authToken") as string
    const values = {
      token: authToken
    }
     fetchData("AuthApi/logout", {method: 'post', data: {...values}});
  }

  useEffect(() => {
    if(Number(data.status) == 200) {
      localStorage.removeItem("authToken");
      navigate("/");
    }

    console.log(error)
    if (error) {
      setLogotErr("Error logging out")
    }
  }, [data, error])

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("Book")) {
      setLogined(true);
    } else {
      setLogined(false);
    }
    console.log(path);
  })
 



  return (
    <>
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800" >Book Library</Link>
          { logined &&  <button className="nav-link text-gray-600 hover:text-gray-800" onClick={handlerLogout}>Logout</button> }       
        </nav>
      </header>
      <p className="bg-red-500 text-gray-800 rounded-sm px-2 w-full" >{logoutErr}</p>
    </>
  )
}
export default Header