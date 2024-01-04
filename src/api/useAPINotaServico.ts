import { httpGetAsync, httpPostAsync } from "../core/http/HTTPClient";
import { INotaServico } from "../types/INotaServico";

const url = "api/nota-servico";

export const useApiNotaServico = () => {
    
  const getAsync = async (codNotaServico : number): Promise<INotaServico> => {
    return await httpGetAsync<INotaServico>(`${url}/${codNotaServico}`);
  }
      
  const addAsync = async (data: INotaServico): Promise<INotaServico> =>{
    return await httpPostAsync(url, data);
  }
      
  return {
    getAsync,
    addAsync,
  }
}