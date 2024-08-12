import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <main role="main" className="mx-[2rem] md:mx-[5rem] lg:mx-[8rem]">
        <Outlet />
    </main>
  )
}

export default Main;