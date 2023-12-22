import { useCrudApi } from "../core/hook/useCrudApi";
import { IServico } from "../types/servico";

const url = "api/servico";

export const useAPIServico = () => {
  return useCrudApi<IServico>(url);
}