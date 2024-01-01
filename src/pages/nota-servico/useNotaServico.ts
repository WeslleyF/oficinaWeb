import { useEffect, useState } from "react"
import { INotaServico } from "../../types/INotaServico"
import { useApiNotaServico } from "../../api/useAPINotaServico";
import { useAPICliente } from "../../api/useAPICliente";
import { ICliente } from "../../types/cliente";
import { useNotaServicoItem, useNotaServicoItemReturn } from "./useNotaServicoItem";

export type useNotaServicoReturn = {
  value: INotaServico,
  enviarAsync: () => Promise<void>,
  limpar: () => void,
  listClientes: ICliente[],
  syncFormValues: (notaServico: INotaServico) => void,
  item: useNotaServicoItemReturn,
}

interface IOptions {
  defaultValues?: Partial<INotaServico>,
}

export const useNotaServico = (options?: IOptions): useNotaServicoReturn => {
  const [value, setValue] = useState<INotaServico>((options?.defaultValues ? options?.defaultValues : {}) as INotaServico);
  const apiNotaServico = useApiNotaServico();
  const apiCliente = useAPICliente();
  const [listClientes, setListClientes] = useState<ICliente[]>([]);
  const item = useNotaServicoItem({notaServico: value});

  useEffect(() => {
    initAsync();
  }, []);

  const syncInternalValue = (notaServico: INotaServico) => {
    setValue({...notaServico}); 
  }

  const syncFormValues = (notaServico: INotaServico) => {
    syncInternalValue({...value, ...notaServico});
  }

  const initAsync = async () => {
    setListClientes(await apiCliente.getAllAsync());
  }

  const enviarAsync = async () => {
    await apiNotaServico.addAsync(value);
  }

  const limpar = () => {
    const notaServico = {...value};
    notaServico.codNotaServico = 0;
    notaServico.dataCadastro   = new Date();
    notaServico.dataPrestacao  = new Date();
    notaServico.valor = 0;
    notaServico.itens = []; 
    notaServico.codCliente = 0;
    notaServico.cliente = undefined;
    syncInternalValue(notaServico);
  }

  return {
    value,
    enviarAsync,
    limpar,
    listClientes,
    syncFormValues,
    item
  }
}