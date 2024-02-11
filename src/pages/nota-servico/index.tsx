import { LayoutDefault } from "../../core/components/layout/LayoutDefault"
import { PageTitle } from "../../core/components/layout/PageTitle"
import { useState } from "react";
import { FormNotaServico } from "./FormNotaServico";
import { ConsultaNotaServico } from "./ConsultaNotaServico";
import { BarraAcao } from "../../core/components/layout/BarraAcao";
import { Button } from "@mui/material";
import { useApiNotaServico } from "../../api/useAPINotaServico";
import { INotaServico } from "../../types/INotaServico";

export default function index(){
  const [acao, setAcao] = useState<"consulta" | "emissao">("consulta");
  const apiNotaServico    = useApiNotaServico();
  const [notas, setNotas] = useState<INotaServico[]>([]);
 
  const onFinishEmissao = () => {
    setAcao("consulta");
  }

  const handleCadastrar = () => {
    setAcao("emissao");
  }
  
  const handleConsultar = async () => {
    setNotas(await apiNotaServico.getAsync());   
  }

  return(
        <LayoutDefault>
          <PageTitle> Nota de serviço</PageTitle>
           {(acao == "emissao") && <FormNotaServico onFinish={onFinishEmissao}/>}
           {(acao == "consulta") && (
             <>
               <BarraAcao>
                  <Button variant="outlined" color={"success"} sx={{width: '10rem', marginRight: 1 }} onClick={handleConsultar}> Consultar</Button>
                  <Button variant="outlined" color={"secondary"} sx={{width: '10rem', }} onClick={handleCadastrar}> Cadastrar</Button>
                </BarraAcao> 
               
               <ConsultaNotaServico notas={notas}/>
             </>
           )}
          
        </LayoutDefault>
    )
}