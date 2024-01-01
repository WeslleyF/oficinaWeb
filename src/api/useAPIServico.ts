import { useCrudApi } from "../core/hook/useCrudApi";
import { httpGetAllAsync } from "../core/http/HTTPClient";
import { IServico } from "../types/servico";

const url = "api/servico";

export const useAPIServico = () => {
  const { getAllAsync, getAsync, addAsync, updateAsync, deleteAsync } = useCrudApi<IServico>(url);

  const getAllListaServicoAsync = async (): Promise<IServico[]> => { 
    return await httpGetAllAsync<IServico>(`${url}/Lista`);
  }

  return {
    getAllAsync, 
    getAsync, 
    addAsync, 
    updateAsync, 
    deleteAsync,
    getAllListaServicoAsync
  }
}