import { ReactNode, useEffect, useState } from "react"
import { useCrudApiReturn } from "../hook/useCrudApi"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { Box, Button } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import { BarraAcao } from "./layout/BarraAcao"
import { Form } from "./form/Form"

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

enum ModoTipo {Lista, Cadastro, Edicao, Exclusao};

interface IProps<T extends FieldValues>{
  children?: ReactNode,
  api: useCrudApiReturn<T>,
  form: UseFormReturn<T>
  columns: GridColDef[];
  keyField: string;
}

export const CrudPadrao = <T extends FieldValues>(props: IProps<T>) => {
  const [modo, setModo] = useState<ModoTipo>(ModoTipo.Lista);
  const [itens, setItens] = useState<any[]>([]);

  useEffect(() => {
    doConsultarItens();
  }, []);

  const doConsultarItens = async () => {
    const itens = await props.api.getAllAsync();
    setItens(itens);
  }

  const doAtualizarLista = (data: any) => {
    let newItens: any[] = [];
    
    if(modo == ModoTipo.Cadastro)
      newItens = [data, ...itens];

    if(modo == ModoTipo.Edicao){
      const index = itens.findIndex(x => x[props.keyField] == data[props.keyField]);
      newItens = [...itens.slice(0, index), data, ...itens.slice(index + 1)]
    }

    if(modo == ModoTipo.Exclusao){
      newItens = itens.filter(x => x[props.keyField] != data[props.keyField]);
    }

    setItens(newItens);
  }

  const handleCadastrar = () => {
    setModo(ModoTipo.Cadastro);
    props.form.reset();
  }

  const handleConsultar = () => {
    doConsultarItens();
  }

  const handleVoltar = () => {
    setModo(ModoTipo.Lista);
  }

  const handleSubmit = async (data : any) => {
    let obj = undefined;
    
    if(modo == ModoTipo.Cadastro) 
      obj = await props.api.addAsync(data);

    if(modo == ModoTipo.Edicao) 
      obj = await props.api.updateAsync(data);

    if(modo == ModoTipo.Exclusao) 
      obj = await props.api.deleteAsync();

    if(obj) doAtualizarLista(obj);
    setModo(ModoTipo.Lista);
  }

  const handleEditar = (data: any) => {
    props.form.reset(data);
    setModo(ModoTipo.Edicao);
  }

  const handleExcluir = (data: any) => {
    props.form.reset(data);
    setModo(ModoTipo.Exclusao);
  }

  return (
    <Box sx={{ width: '100%', paddingRight: 3}}>
      {(modo == ModoTipo.Lista) && (
        <BarraAcao>
          <Button color="success" variant="outlined" onClick={handleCadastrar} sx={{width: '10rem'}}>Cadastrar</Button>
          <Button color="primary" variant="outlined" onClick={handleConsultar} sx={{width: '10rem', marginLeft: 1}}>Consultar</Button>
        </BarraAcao>
      )}

      <Box>
        {(modo != ModoTipo.Lista) && (
          <>
            <Form handleSubmit={props.form.handleSubmit(handleSubmit)} boxPros={{marginBottom: 1}}>
              {props.children}
            
            
              <BarraAcao flex={1}  display="flex" justifyContent="center" alignItems="center">
                <Button variant="outlined" color={modo != ModoTipo.Exclusao ? "warning" : "primary"} onClick={handleVoltar} sx={{width: '10rem', }}>Voltar</Button>
                <Button variant="outlined" color={modo != ModoTipo.Exclusao ? "success" : "error"} type="submit" sx={{width: '10rem', marginLeft: 1 }}> 
                  {modo != ModoTipo.Exclusao ? "Salvar" : "Excluir"}
                </Button>
              </BarraAcao> 
            </Form>
          </>
        )}
        {(modo == ModoTipo.Lista) && (
          <DataGrid autoHeight disableColumnFilter density="compact" disableRowSelectionOnClick={false}
            rows={itens}
            columns={[
              {
                field:"Ações", type:"actions", sortable: false, width: 100,
                getActions:({ row }) => [
                  <GridActionsCellItem key={row} color="info"  icon={<EditIcon />} onClick={()=> handleEditar(row)} label="Alterar Registro" />,
                  <GridActionsCellItem key={row} color="error" icon={<DeleteIcon />} onClick={()=> handleExcluir(row)}  label="Excluir Registro" />,
                ],
              
              }, ...props.columns
              ]}
            getRowId={(row: any) => row[props.keyField]}
            pageSizeOptions={[10]}
        />
        )}  
      </Box>    
    </Box>
  )

}