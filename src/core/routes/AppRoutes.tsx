import { Route, Routes } from "react-router"
import { Home } from "../../pages/Home/Home"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
    </Routes>
  )
}