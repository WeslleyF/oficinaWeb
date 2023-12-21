import { useCrudApi } from "../core/hook/useCrudApi";
import { IEstado } from "../types/estado";

const url = "api/estado";

export const useAPIEstado = () => {
  const { getAllAsync } = useCrudApi<IEstado>(url);

  return {
    getAllAsync
  }
}