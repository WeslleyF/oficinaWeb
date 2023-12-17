import { ReactNode, useEffect, useState } from "react"
import { useCrudApiReturn } from "../hook/useCrudApi"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { Box, Button } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { BarraAcao } from "./layout/BarraAcao"
import { Form } from "./form/Form"

enum ModoTipo {Lista, Cadastro, Edicao, Exclusao};

interface IProps<T extends FieldValues>{
  children?: ReactNode,
  api: useCrudApiReturn<T>,
  form: UseFormReturn<T>
  columns?: GridColDef[];
  keyField: string;
}

export const CrudPadrao = <T extends FieldValues>(props: IProps<T>) => {
  const [modo, setModo] = useState<ModoTipo>(ModoTipo.Lista);
  const [itens, setItens] = useState<any[]>([]);

  useEffect(() => {
    consultarItens();
  }, []);

  const consultarItens = async () => {
    const itens = await props.api.getAllAsync();
    setItens(itens);
  }

  const handleCadastrar = () => {
    setModo(ModoTipo.Cadastro);
  }

  const handleVoltar = () => {
    setModo(ModoTipo.Lista);
  }

  const handleSubmit = async (data: T) => {
    let obj: T;
    
    if(modo == ModoTipo.Cadastro) 
      obj = await props.api.addAsync(data);

    if(modo == ModoTipo.Edicao) 
      obj = await props.api.updateAsync(data);
  }

  return (
    <Box sx={{ width: '100%', paddingRight: 3}}>
      <BarraAcao>
        <Button variant="outlined" onClick={handleCadastrar} sx={{width: '10rem'}}>Cadastrar</Button>
      </BarraAcao>

      <Box>
        {(modo != ModoTipo.Lista) && (
          <>
            <Form handleSubmit={props.form.handleSubmit(handleSubmit)} boxPros={{marginBottom: 1}}>
              {props.children}
            </Form>
            
            <BarraAcao flex={1}  display="flex" justifyContent="center" alignItems="center">
              <Button variant="outlined" color="warning" onClick={handleVoltar} sx={{width: '10rem', }}>Voltar</Button>
              <Button variant="outlined" color="success" type="submit" sx={{width: '10rem', marginLeft: 1 }}>Cadastrar</Button>
            </BarraAcao> 
          </>
        )}
        {(modo == ModoTipo.Lista) && (
          <DataGrid
            rows={itens}
            columns={props.columns ?? []}
            disableRowSelectionOnClick
            getRowId={(row) => row[props.keyField]}
          />  
        )}  
      </Box>    
    </Box>
  )

}