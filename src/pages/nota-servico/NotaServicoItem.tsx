import { useForm } from "react-hook-form";
import { Grid, IconButton, Typography } from "@mui/material";
import { FTextEdit } from "../../core/components/formInput/FTextEdit";
import { Form } from "../../core/components/form/Form";
import { BarraAcao } from "../../core/components/layout/BarraAcao";
import { IFormNotaServicoItem } from "./types";
import { useEffect, useState } from "react";
import { FAutoComplete } from "../../core/components/formInput/FAutoComplete";
import { useNotaServicoReturn } from "./useNotaServico";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface IProps {
  notaServico: useNotaServicoReturn,
}

export const NotaServicoItem = (props: IProps) => {
  const formItem = useForm<IFormNotaServicoItem>({values: props.notaServico.item.value});
  const [acao, setAcao] = useState<"cadastro" | "edição">("cadastro");

  useEffect(() => {
    props.notaServico.item.syncFormValues(formItem.getValues());
 }, [formItem.watch("codServico"), formItem.watch("qtd")]);
   
  const handleSubmit = async (data: IFormNotaServicoItem) => {
    // await props.notaServico.

    setAcao("cadastro");
  }

  const handleCancelar = () => {
    props.notaServico.limpar();
    setAcao("cadastro");
  }
  
  return(
    <BarraAcao height={'auto'}>
      <Form handleSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h6" component="h5">Serviços</Typography>
          </Grid>
          
          <Grid item xs={6} md={6} lg={6}>
            <FAutoComplete control={formItem.control} listItens={props.notaServico.item.listServicos} field="codServico" keyField="codServico" listField="descricao" label="Serviço" fullWidth margin="none"></FAutoComplete> 
          </Grid>
          
          <Grid item xs={2} md={2} lg={2}>
            <FTextEdit control={formItem.control} field="valor" label="Valor" fullWidth disabled></FTextEdit> 
          </Grid>

          <Grid item xs={1} md={1} lg={1}>
            <FTextEdit control={formItem.control} field="qtd" label="Qtd" fullWidth></FTextEdit> 
          </Grid>

          <Grid item xs={2} md={2} lg={2}>
            <FTextEdit control={formItem.control} field="valorTotal" label="Total" fullWidth disabled></FTextEdit> 
          </Grid>

          <Grid item xs={0.5} md={0.5} lg={0.5}>
            <IconButton color="primary" type="submit">
              <CheckIcon/>
            </IconButton>
          </Grid>

          <Grid item xs={0.5} md={0.5} lg={0.5}>
            <IconButton color="error" onClick={handleCancelar}>
              <ClearIcon/>
            </IconButton>
          </Grid>
        </Grid>    
      </Form> 
    </BarraAcao>
  )
}