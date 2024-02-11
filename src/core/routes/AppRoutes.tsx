import { Route, Routes } from "react-router";
import Home  from "../../pages/home"
import CadastroCliente  from "../../pages/cliente";
import CadastroServico  from "../../pages/servico";
import NotaServico from "../../pages/nota-servico";

// const NotaServico = lazy(() => import("../../pages/nota-servico"));
// const CadastroServico = lazy(() => import("../../pages/servico"));
// const CadastroCliente = lazy(() => import("../../pages/cliente"));
// const Home = lazy(() => import("../../pages/home"));

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