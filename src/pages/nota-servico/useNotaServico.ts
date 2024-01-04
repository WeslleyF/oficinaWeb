import { useEffect, useState } from "react"
import { INotaServico } from "../../types/INotaServico"
import { useApiNotaServico } from "../../api/useAPINotaServico";
import { useAPICliente } from "../../api/useAPICliente";
import { ICliente } from "../../types/cliente";
import { useNotaServicoItem, useNotaServicoItemReturn } from "./useNotaServicoItem";
import { INotaServicoItem } from "../../types/INotaServicoItem";

export type useNotaServicoReturn = {
  value: INotaServico,
  enviarAsync: () => Promise<void>,
  limpar: () => void,
  listClientes: ICliente[],
  syncFormValues: (notaServico: INotaServico) => void,
  item: useNotaServicoItemReturn,
  addItem: (item: INotaServicoItem) => void,
  updateItem: (item: INotaServicoItem) => void,
  removeItem: (item: INotaServicoItem) => void,
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

  const calcular = (notaServico: INotaServico) => {
    notaServico.valor = 0;
    if(notaServico.itens && notaServico.itens.length > 0){
      notaServico.valor = notaServico.itens.map(nsi => nsi.valorTotal).reduce((total, atual) => total = total + atual)
    }
  }

  const addItem = (item: INotaServicoItem) => {
    const notaServico = {...value};
    
    if(!notaServico.itens || notaServico.itens.length == 0)
      notaServico.itens = [];

    notaServico.itens = [{...item, id: notaServico.itens.length + 1}, ...notaServico.itens];
    
    calcular(notaServico);
    syncInternalValue(notaServico);
  }

  const updateItem = (item: INotaServicoItem) => {
    const notaServico = {...value};
    if(!notaServico.itens) return;

    const index = notaServico.itens.findIndex(x => x.id == item.id);
    notaServico.itens = [...notaServico.itens.slice(0, index), item, ...notaServico.itens.slice(index + 1)]
    
    calcular(notaServico);
    syncInternalValue(notaServico);
  }

  const removeItem = (item: INotaServicoItem) => {
    const notaServico = {...value};
    if(!notaServico.itens) return;

    notaServico.itens = notaServico.itens.filter(nsi => nsi.id != item.id);

    calcular(notaServico);
    syncInternalValue(notaServico);
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
    item,
    addItem,
    updateItem,
    removeItem
  }
}