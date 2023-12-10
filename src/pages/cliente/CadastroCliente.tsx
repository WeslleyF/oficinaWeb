import { useEffect } from "react";
import { useAPIEstado } from "../../api/estado/useAPIEstado"
import { LayoutDefault } from "../../core/components/LayoutDefault"
import { PageTitle } from "../../core/components/PageTitle"

export const CadastroCliente = () => {
  const apiEstado = useAPIEstado();
  
  useEffect(() => {
    const f = async () =>{
      console.log(await apiEstado.getAllAsync());  
    }
    
    f();
  }, []);
  
  return(
        <LayoutDefault>
          <PageTitle>Cadastro de cliente</PageTitle>
        </LayoutDefault>
    )
}