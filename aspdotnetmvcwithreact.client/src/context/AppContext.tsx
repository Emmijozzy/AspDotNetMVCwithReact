import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface App  {
  token?: string, 
  setToken?: Dispatch<SetStateAction<string>>,
  appUser?: string,
  setAppUser?:Dispatch<SetStateAction<string>>
  }

export const AppContext = createContext<App>({});

const AppContextProvide = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");
  const [appUser, setAppUser] = useState<string>("")

  const contextValue = {
    token,
    setToken,
    appUser,
    setAppUser
  } 

  return (
    <AppContext.Provider value={contextValue} >
      { children }
    </AppContext.Provider>
  )
}

export default AppContextProvide;