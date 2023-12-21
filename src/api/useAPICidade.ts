import { useCrudApi } from "../core/hook/useCrudApi";
import { ICidade } from "../types/cidade";

const url = "api/cidade";

export const useAPICidade = () => {
  const { getAllAsync } = useCrudApi<ICidade>(url);

  return {
    getAllAsync
  }
}