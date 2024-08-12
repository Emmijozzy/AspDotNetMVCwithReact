/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const VerifyAuth = () => {
  console.log("Veri");
  const { token, appUser } = useContext(AppContext);

  const authToken = token || localStorage.getItem('authToken')
  // console.log(authToken, "AttaToken")
  const expAppUser = appUser || localStorage.getItem('appUser')

  // console.log(expAppUser, " expuser", typeof expAppUser)

  let content;

  if(authToken) {
    const decode = jwtDecode(authToken as string)
    console.log("user", decode, expAppUser, decode.sub == expAppUser )
    if (decode.sub == expAppUser) {
      console.log("verified")
      content = <Outlet />
    } else {
      content = <Navigate to="/Auth/Login" />
    }
  }

  



  return content
}
export default VerifyAuth