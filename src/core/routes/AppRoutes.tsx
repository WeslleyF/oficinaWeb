import { Route, Routes } from "react-router"
import { Home } from "../../pages/Home/Home"
import { CadastroCliente } from "../../pages/cliente/CadastroCliente"
import { CadastroServico } from "../../pages/servico/CadastroServico"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Cliente" element={<CadastroCliente/>}></Route>
        <Route path="/serviço" element={<CadastroServico/>}></Route>
    </Routes>
  )
}