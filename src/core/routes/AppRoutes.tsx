import { Route, Routes } from "react-router"
import { Home } from "../../pages/Home/Home"
import { CadastroCliente } from "../../pages/cliente/CadastroCliente"
import { CadastroServico } from "../../pages/servico/CadastroServico"
import { NotaServico } from "../../pages/nota-servico/NotaServico"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Cliente" element={<CadastroCliente/>}></Route>
        <Route path="/serviço" element={<CadastroServico/>}></Route>
        <Route path="/nota-servico" element={<NotaServico/>}></Route>
    </Routes>
  )
}