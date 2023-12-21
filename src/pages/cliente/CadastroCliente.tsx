import { useEffect, useState } from "react";
import { useAPIEstado } from "../../api/useAPIEstado"
import { LayoutDefault } from "../../core/components/LayoutDefault"
import { PageTitle } from "../../core/components/PageTitle"
import { IEstado } from "../../types/estado";
import { useForm } from "react-hook-form";
import { FAutoComplete } from "../../core/components/formInput/FAutoComplete";
import { Grid } from "@mui/material";
import { CrudPadrao } from "../../core/components/CrudPadrao";
import { useAPICliente } from "../../api/useAPICliente";
import { IFormCLiente } from "./types";
import { GridColDef } from "@mui/x-data-grid";
import { FTextEdit } from "../../core/components/formInput/FTextEdit";
import { ICidade } from "../../types/cidade";
import { IBairro } from "../../types/bairro";
import { useAPICidade } from "../../api/useAPICidade";
import { useAPIBairro } from "../../api/useAPIBairro";

const columns: GridColDef[] = [
  { field: "codCliente", headerName: "Código", width: 90 },
  { field: "nome", headerName: "Nome", width: 250 },
  { field: "cpf", headerName: "CPF", width: 200 },
  { field: "cnpj", headerName: "CNPJ", width: 200 },
  { field: "inscricaoMunicipal", headerName: "Inscrição municipal", width: 200 },
  { field: "razaoSocial", headerName: "Razão social", width: 200 },
  { field: "cep", headerName: "CEP", width: 200 },
  { field: "telefone", headerName: "Telefone", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "logradouro", headerName: "Logradouro", width: 200 },
];

export const CadastroCliente = () => {
  const apiEstado = useAPIEstado();
  const apiCliente = useAPICliente();
  const apiCidade = useAPICidade();
  const apiBairro = useAPIBairro();
  const form = useForm<IFormCLiente>({defaultValues: {nome: ""}})
  const [listEstados, setListEstados] = useState<IEstado[]>([]);
  const [listCidades, setListCidades] = useState<ICidade[]>([]);
  const [listBairros, setListBairros] = useState<IBairro[]>([]);

  const uf        = form.watch("uf");
  const codCidade = form.watch("codCidade");
  
  useEffect(() => {
    const f = async () =>{
      setListEstados(await apiEstado.getAllAsync());  
    }
    
    f();
  }, []);

  useEffect(() => {
    const f = async () =>{
      setListCidades([]);
      if(!uf) return;
      setListCidades(await apiCidade.getAllAsync({uf: uf}));  
    }
    
    f();
  }, [uf]);

  useEffect(() => {
    const f = async () =>{
      setListBairros([]);
      if(!codCidade) return;
      setListBairros(await apiBairro.getAllAsync({codCidade: codCidade}));  
    }
    
    f();
  }, [codCidade]);
  
  return(
        <LayoutDefault>
          <PageTitle>Cadastro de cliente</PageTitle>
          <CrudPadrao form={form} api={apiCliente} keyField="codCliente" columns={columns}>
             <Grid container spacing={1}>
                <Grid item xs={12} md={4} lg={4}>
                  <FTextEdit control={form.control} field="nome" label="Nome" fullWidth></FTextEdit> 
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                  <FTextEdit control={form.control} field="razaoSocial" label="Razão social" fullWidth></FTextEdit> 
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                  <FTextEdit control={form.control} field="inscricaoMunicipal" label="Inscrição municipal" fullWidth></FTextEdit> 
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <FTextEdit control={form.control} field="cpf" label="CPF" fullWidth></FTextEdit> 
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <FTextEdit control={form.control} field="cnpj" label="CNPJ" fullWidth></FTextEdit> 
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <FTextEdit control={form.control} field="telefone" label="Telefone" fullWidth></FTextEdit> 
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <FTextEdit control={form.control} field="email" label="Email" fullWidth></FTextEdit> 
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                  <FTextEdit control={form.control} field="cep" label="CEP" fullWidth></FTextEdit> 
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <FTextEdit control={form.control} field="logradouro" label="Logradouro" fullWidth></FTextEdit> 
                </Grid>

                <Grid item xs={12} md={2} lg={2}>
                  <FTextEdit control={form.control} field="numero" label="Número" fullWidth></FTextEdit> 
                </Grid>
              
                <Grid item xs={12} md={4} lg={4}>
                  <FAutoComplete control={form.control} listItens={listEstados} field="uf" keyField="uf" listField="descricao" label="Estado" fullWidth></FAutoComplete> 
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                  <FAutoComplete control={form.control} listItens={listCidades} field="codCidade" keyField="codCidade" listField="descricao" label="Cidade" fullWidth></FAutoComplete> 
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                  <FAutoComplete control={form.control} listItens={listBairros} field="codBairro" keyField="codBairro" listField="descricao" label="Bairro" fullWidth></FAutoComplete> 
                </Grid>
             </Grid> 
          </CrudPadrao>
        </LayoutDefault>
    )
}