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

export const NotaServico = () => {
  const apiServico = useAPIServico();
  const form = useForm<IFormServico>({defaultValues: {}})
  
  return(
        <LayoutDefault>
          <PageTitle>Emissão de nota de serviço</PageTitle>
        
          <Form handleSubmit={props.form.handleSubmit(handleSubmit)} boxPros={{marginBottom: 2}}>
              <Box sx={{mb: 1}}>
              <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={6}>
              <FTextEdit control={form.control} field="descricao" label="Descrição" fullWidth></FTextEdit> 
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <FTextEdit control={form.control} field="valor" label="Valor" fullWidth></FTextEdit> 
            </Grid>
          </Grid> 
              </Box>
              
              <BarraAcao flex={1}  display="flex" justifyContent="center" alignItems="center">
                <Button variant="outlined" color={modo != ModoTipo.Exclusao ? "warning" : "primary"} onClick={handleVoltar} sx={{width: '10rem', }}>Voltar</Button>
                <Button variant="outlined" color={modo != ModoTipo.Exclusao ? "success" : "error"} type="submit" sx={{width: '10rem', marginLeft: 1 }}> 
                  {modo != ModoTipo.Exclusao ? "Salvar" : "Excluir"}
                </Button>
              </BarraAcao> 
          </Form>
        </LayoutDefault>
    )
}