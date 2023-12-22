import { LayoutDefault } from "../../core/components/layout/LayoutDefault"
import { PageTitle } from "../../core/components/layout/PageTitle"
import { useForm } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import { FTextEdit } from "../../core/components/formInput/FTextEdit";
import { Form } from "../../core/components/form/Form";
import { BarraAcao } from "../../core/components/layout/BarraAcao";
import { useApiNotaServico } from "../../api/useAPINotaServico";
import { IFormNotaServico } from "./types";
import { useAPICliente } from "../../api/useAPICliente";
import { useEffect, useState } from "react";
import { ICliente } from "../../types/cliente";
import { FAutoComplete } from "../../core/components/formInput/FAutoComplete";
import { FDateTime } from "../../core/components/formInput/FDateTime";

export const NotaServico = () => {
  const apiNotaServico = useApiNotaServico();
  const apiCliente = useAPICliente();
  const [dataCadastro] = useState(new Date());
  const form = useForm<IFormNotaServico>({defaultValues: {dataCadastro: dataCadastro, dataPrestacao: dataCadastro}});
  const [listClientes, setListClientes] = useState<ICliente[]>([]);
 
  useEffect(() => {
    const f = async () => {
      setListClientes(await apiCliente.getAllAsync());
    }
    
    f();  
  }, []);
  
  const handleSubmit = async (data : any) => {
    await apiNotaServico.addAsync(data);
  }

  const handleCancelar = () => {
    form.reset();
  }
  
  return(
        <LayoutDefault>
          <PageTitle>Emissão de nota de serviço</PageTitle>
        
          <Form handleSubmit={form.handleSubmit(handleSubmit)} boxPros={{marginBottom: 2, width: '100%', paddingRight: 1}}>
              <Box sx={{mb: 1}}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12} lg={12}>
                    <FAutoComplete control={form.control} listItens={listClientes} field="codCliente" keyField="codCliente" listField="nome" label="Cliente" fullWidth></FAutoComplete> 
                  </Grid>

                  <Grid item xs={12} md={4} lg={4}>
                    <FDateTime control={form.control} field="dataCadastro" label="Data Cadastro" fullWidth></FDateTime> 
                  </Grid>
                  
                  <Grid item xs={12} md={4} lg={4}>
                    <FDateTime control={form.control} field="dataPrestacao" label="Data Prestação" fullWidth></FDateTime> 
                  </Grid>

                  <Grid item xs={12} md={4} lg={4}>
                    <FTextEdit control={form.control} field="valor" label="Valor" fullWidth></FTextEdit> 
                  </Grid>
                </Grid> 
              </Box>
              
              <BarraAcao flex={1}  display="flex" justifyContent="center" alignItems="center">
                <Button variant="outlined" color={"success"} type="submit" sx={{width: '10rem', marginLeft: 1 }}> Salvar</Button>
                <Button variant="outlined" color={"warning"} sx={{width: '10rem', marginLeft: 1 }} onClick={handleCancelar}> Cancelar</Button>
              </BarraAcao> 
          </Form>
        </LayoutDefault>
    )
}