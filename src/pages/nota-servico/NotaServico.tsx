import { LayoutDefault } from "../../core/components/layout/LayoutDefault"
import { PageTitle } from "../../core/components/layout/PageTitle"
import { useForm } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import { FTextEdit } from "../../core/components/formInput/FTextEdit";
import { Form } from "../../core/components/form/Form";
import { BarraAcao } from "../../core/components/layout/BarraAcao";
import { IFormNotaServico } from "./types";
import { useEffect, useState } from "react";
import { FAutoComplete } from "../../core/components/formInput/FAutoComplete";
import { FDateTime } from "../../core/components/formInput/FDateTime";
import { useNotaServico } from "./useNotaServico";
import { NotaServicoItem } from "./NotaServicoItem";
import { INotaServicoItem } from "../../types/INotaServicoItem";

export const NotaServico = () => {
  const [dataCadastro] = useState(new Date());
  const notaServico = useNotaServico({defaultValues: {dataCadastro: dataCadastro, dataPrestacao: dataCadastro}});
  const form = useForm<IFormNotaServico>({values: notaServico.value});

  useEffect(() => {
     notaServico.syncFormValues(form.getValues());
  }, [form.watch("codCliente"), form.watch("dataCadastro"), form.watch("dataPrestacao")]);
   
  const handleSubmit = async () => {
    await notaServico.enviarAsync();
  }

  const handleCancelar = () => {
    notaServico.limpar();
  }

  const addItem = (item: INotaServicoItem) => {
    
  }
  
  return(
        <LayoutDefault>
          <PageTitle>Emissão de nota de serviço</PageTitle>
        
          <Form handleSubmit={form.handleSubmit(handleSubmit)} boxPros={{width: '100%'}}>
              <Box sx={{mb: 1}}>
                <BarraAcao>
                  <Button variant="outlined" color={"success"} type="submit" sx={{width: '10rem', marginLeft: 1 }}> Salvar</Button>
                </BarraAcao> 
                
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12} lg={12}>
                    <FAutoComplete control={form.control} listItens={notaServico.listClientes} field="codCliente" keyField="codCliente" listField="nome" label="Cliente" fullWidth></FAutoComplete> 
                  </Grid>

                  <Grid item xs={12} md={4} lg={4}>
                    <FDateTime control={form.control} field="dataCadastro" label="Data Cadastro" fullWidth></FDateTime> 
                  </Grid>
                  
                  <Grid item xs={12} md={4} lg={4}>
                    <FDateTime control={form.control} field="dataPrestacao" label="Data Prestação" fullWidth></FDateTime> 
                  </Grid>

                  <Grid item xs={12} md={4} lg={4}>
                    <FTextEdit control={form.control} field="valor" label="Valor" fullWidth disabled></FTextEdit> 
                  </Grid>
                </Grid> 
              </Box>
          </Form>
          <NotaServicoItem notaServico={notaServico}/>
        </LayoutDefault>
    )
}