import { useEffect, useState } from "react";
import { useAPIEstado } from "../../api/estado/useAPIEstado"
import { LayoutDefault } from "../../core/components/LayoutDefault"
import { PageTitle } from "../../core/components/PageTitle"
import { IEstado } from "../../types/estado";
import { useForm } from "react-hook-form";
import { Form } from "../../core/components/form/Form";
import { FAutoComplete } from "../../core/components/formInput/FAutoComplete";
import { Button, Grid } from "@mui/material";
import { CrudPadrao } from "../../core/components/CrudPadrao";
import { useAPICliente } from "../../api/cliente/useAPICliente";
import { IFormCLiente } from "./types";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "codCliente", headerName: "Código", width: 90 },
  { field: "nome", headerName: "Nome", width: 250 },
];

export const CadastroCliente = () => {
  const apiEstado = useAPIEstado();
  const apiCliente = useAPICliente();
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
          <CrudPadrao form={form} api={apiCliente} keyField="codCliente" columns={columns}>
             <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                  <FAutoComplete control={form.control} listItens={listEstados} field="uf" keyField="uf" listField="descricao" label="Estado" fullWidth></FAutoComplete> 
                </Grid>
             </Grid> 
          </CrudPadrao>
        </LayoutDefault>
    )
}