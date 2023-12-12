import { useEffect, useState } from "react";
import { useAPIEstado } from "../../api/estado/useAPIEstado"
import { LayoutDefault } from "../../core/components/LayoutDefault"
import { PageTitle } from "../../core/components/PageTitle"
import { IEstado } from "../../types/estado";
import { useForm } from "react-hook-form";
import { Form } from "../../core/components/form/Form";
import { FAutoComplete } from "../../core/components/formInput/FAutoComplete";
import { Button } from "@mui/material";

export const CadastroCliente = () => {
  const apiEstado = useAPIEstado();
  const form = useForm<IFormCLiente>()
  const [listEstados, setListEstados] = useState<IEstado[]>([]);
  
  useEffect(() => {
    const f = async () =>{
      setListEstados(await apiEstado.getAllAsync());  
    }
    
    f();
  }, []);
  
  return(
        <LayoutDefault>
          <PageTitle>Cadastro de cliente</PageTitle>
          <Form handleSubmit={form.handleSubmit((a) => console.log(a))}>
             <FAutoComplete control={form.control} listItens={listEstados} field="uf" keyField="uf" listField="descricao" label="Estado" fullWidth></FAutoComplete> 
             <Button type="submit">AA</Button>
          </Form>
        </LayoutDefault>
    )
}