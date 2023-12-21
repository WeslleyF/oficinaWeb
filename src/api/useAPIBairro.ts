import { useCrudApi } from "../core/hook/useCrudApi";
import { IBairro } from "../types/bairro";

const url = "api/bairro";

export const useAPIBairro = () => {
  const { getAllAsync } = useCrudApi<IBairro>(url);

  return {
    getAllAsync
  }
}