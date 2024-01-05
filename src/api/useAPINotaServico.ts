import { httpGetAsync, httpPostAsync } from "../core/http/HTTPClient";
import { INotaServico } from "../types/INotaServico";
import { INotaServicoItem } from "../types/INotaServicoItem";

const url = "api/nota-servico";

export const useApiNotaServico = () => {
    
  const getAsync = async (): Promise<INotaServico[]> => {
    return await httpGetAsync<INotaServico[]>(url);
  }

  const getAsyncItens = async (codNotaServico : number): Promise<INotaServicoItem[]> => {
    return await httpGetAsync<INotaServicoItem[]>(`${url}/itens/${codNotaServico}`);
  }
      
  const addAsync = async (data: INotaServico): Promise<INotaServico> =>{
    return await httpPostAsync(url, data);
  }
      
  return {
    getAsync,
    addAsync,
    getAsyncItens
  }
}