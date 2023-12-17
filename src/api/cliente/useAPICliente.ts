import { useCrudApi } from "../../core/hook/useCrudApi";
import { ICliente } from "../../types/cliente";

const url = "api/Cliente";

export const useAPICliente = () => {
  return useCrudApi<ICliente>(url);
}