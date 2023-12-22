import { LayoutDefault } from "../../core/components/layout/LayoutDefault"
import { PageTitle } from "../../core/components/layout/PageTitle"
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { CrudPadrao } from "../../core/components/CrudPadrao";
import { useAPIServico } from "../../api/useAPIServico";
import { IFormServico } from "./types";
import { GridColDef } from "@mui/x-data-grid";
import { FTextEdit } from "../../core/components/formInput/FTextEdit";

const columns: GridColDef[] = [
  { field: "codServico", headerName: "Código", width: 90 },
  { field: "descricao", headerName: "Serviço", width: 250 },
  { field: "valor", headerName: "Valor", width: 200 },
];

export const CadastroServico = () => {
  const apiServico = useAPIServico();
  const form = useForm<IFormServico>({defaultValues: {}})
  
  return(
        <LayoutDefault>
          <PageTitle>Cadastro de Serviços</PageTitle>
          <CrudPadrao form={form} api={apiServico} keyField="codServico" columns={columns}>
             <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={6}>
                  <FTextEdit control={form.control} field="descricao" label="Descrição" fullWidth></FTextEdit> 
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <FTextEdit control={form.control} field="valor" label="Valor" fullWidth></FTextEdit> 
                </Grid>
             </Grid> 
          </CrudPadrao>
        </LayoutDefault>
    )
}