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
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { INotaServicoItem } from "../../types/INotaServicoItem";

interface IProps {
  notaServico: useNotaServicoReturn,
}

export const NotaServicoItem = (props: IProps) => {
  const formItem = useForm<IFormNotaServicoItem>({values: props.notaServico.item.value});
  const [acao, setAcao] = useState<"cadastro" | "edicao">("cadastro");

  useEffect(() => {
    props.notaServico.item.syncFormValues(formItem.getValues());
 }, [formItem.watch("codServico"), formItem.watch("qtd")]);
   
  const handleSubmit = async (data: IFormNotaServicoItem) => {
    if(acao == "cadastro")
      props.notaServico.addItem(data);

    if(acao == "edicao")
      props.notaServico.updateItem(data);
    
    props.notaServico.item.limpar();
    setAcao("cadastro");
  }

  const handleCancelar = () => {
    props.notaServico.item.limpar();
    setAcao("cadastro");
  }

  const handleEditar = (data: INotaServicoItem) => {
    props.notaServico.item.syncExtData(data);
    setAcao("edicao");
  }

  const handleExcluir = (data: INotaServicoItem) => {
    props.notaServico.removeItem(data);
  }
  
  return(
    <BarraAcao height={'auto'}>
      <Form handleSubmit={formItem.handleSubmit(handleSubmit)}>
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

      <DataGrid autoHeight disableColumnFilter density="compact" disableRowSelectionOnClick={false}
            sx={{marginTop: 1}}
            rows={props.notaServico.value.itens ?? []}
            columns={[
              {
                field:"Ações", type:"actions", sortable: false, width: 100,
                getActions:({ row }) => [
                  <GridActionsCellItem key={row.id} color="info"  icon={<EditIcon />} onClick={()=> handleEditar(row)} label="Alterar Registro" />,
                  <GridActionsCellItem key={row.id} color="error" icon={<DeleteIcon />} onClick={()=> handleExcluir(row)}  label="Excluir Registro" />,
                ],
              
              }, 
              { field: "codServico", headerName: "Código", width: 90 },
              { field: "descricao", headerName: "Serviço", width: 250, valueGetter: params => params.row.servico?.descricao },
              { field: "qtd", headerName: "Quantidade", width: 200, },
              { field: "valor", headerName: "Valor", width: 200, },
              { field: "valorTotal", headerName: "Valor total", width: 200, },
              ]}
            getRowId={(row: any) => row.id}
            pageSizeOptions={[10]}
        />
    </BarraAcao>
  )
}