import { useForm } from "react-hook-form";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Form } from "../../core/components/form/Form";
import { BarraAcao } from "../../core/components/layout/BarraAcao";
import { IFormNotaServico } from "./types";
import { useEffect, useState } from "react";
import { FAutoComplete } from "../../core/components/formInput/FAutoComplete";
import { FDateTime } from "../../core/components/formInput/FDateTime";
import { useNotaServico } from "./useNotaServico";
import { FormNotaServicoItem } from "./FormNotaServicoItem";
import { FNumericEdit } from "../../core/components/formInput/FNumericEdit";

interface IProps{
  onFinish: () => void,
}

export const FormNotaServico = (props: IProps) => {
  const [dataCadastro] = useState(new Date());
  const notaServico = useNotaServico({defaultValues: {dataCadastro: dataCadastro, dataPrestacao: dataCadastro}});
  const form = useForm<IFormNotaServico>({values: notaServico.value});

  useEffect(() => {
     notaServico.syncFormValues(form.getValues());
  }, [form.watch("codCliente"), form.watch("dataCadastro"), form.watch("dataPrestacao")]);
   
  const handleSubmit = async () => {
    await notaServico.enviarAsync();
    props.onFinish();
  }

  const handleCancelar = () => {
    notaServico.limpar();
    props.onFinish();
  }
 
  return(
        <>
          <Typography variant="h6" component="h5">Emissão</Typography>
        
          <Form handleSubmit={form.handleSubmit(handleSubmit)} boxPros={{width: '100%'}}>
              <Box sx={{mb: 1}}>
                <BarraAcao>
                  <Button variant="outlined" color={"success"} type="submit" sx={{width: '10rem', marginRight: 1 }}> Salvar</Button>
                  <Button variant="outlined" color={"warning"} sx={{width: '10rem', }} onClick={handleCancelar}> Cancelar</Button>
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
                    <FNumericEdit control={form.control} field="valor" label="Valor" fullWidth disabled></FNumericEdit> 
                  </Grid>
                </Grid> 
              </Box>
          </Form>
          <FormNotaServicoItem notaServico={notaServico}/>
        </>
    )
}