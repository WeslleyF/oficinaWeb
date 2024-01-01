import { useEffect, useState } from "react"
import { INotaServico } from "../../types/INotaServico"
import { useAPIServico } from "../../api/useAPIServico";
import { IServico } from "../../types/servico";
import { INotaServicoItem } from "../../types/INotaServicoItem";

export type useNotaServicoItemReturn = {
  value: INotaServicoItem,
  limpar: () => void,
  syncFormValues: (formData: INotaServicoItem) => void,
  listServicos: IServico[],
}

interface IOptions {
  defaultValues?: Partial<INotaServicoItem>,
  notaServico: INotaServico
}

export const useNotaServicoItem = (options: IOptions) : useNotaServicoItemReturn => {
  const [value, setValue] = useState<INotaServicoItem>((options?.defaultValues ? options?.defaultValues : {}) as INotaServicoItem);  
  const apiServico = useAPIServico();
  const [listServicos, setListServicos] = useState<IServico[]>([]);

  useEffect(() => {
    initAsync();
  }, []);

  const syncInternalValue = (newValue: INotaServicoItem) => {
    setValue({...newValue}); 
  }

  const syncFormValues = (formData: INotaServicoItem) => {
    const item = {...value};

    if(item.qtd != formData.qtd)
      item.qtd = formData.qtd;

    if(item.codServico != formData.codServico){
      item.codServico = formData.codServico;
      
      item.valor      = 0;
      item.valorTotal = 0;
      item.servico    = listServicos.find(s => s.codServico == item.codServico);
      if(item.servico) item.valor = item.servico.valor;
    }
    
    item.valorTotal = (item.qtd ?? 0) * (item.valor ?? 0); 
    syncInternalValue(item);
  }

  const initAsync = async () => {
    setListServicos(await apiServico.getAllListaServicoAsync());
  }

  const limpar = () => {
    const notaServicoItem = {...value}; 
  
    notaServicoItem.codNotaServicoItem = 0;
    notaServicoItem.codNotaServico     = 0;
    notaServicoItem.codServico         = 0;
    notaServicoItem.servico            = undefined; 
    notaServicoItem.valor              = 0;
    notaServicoItem.qtd                = 0;
    notaServicoItem.valorTotal         = 0;

    syncInternalValue(notaServicoItem);
  }

  return {
    value,
    limpar,
    syncFormValues,
    listServicos
  }
}