import { httpDeleteAsync, httpGetAllAsync, httpGetAsync, httpPostAsync, httpPutAsync } from "../http/HTTPClient"

export const useCrudApi = <T>(url: string) => {
  const getAllAsync = async (params? : object[]) => { 
    return await httpGetAllAsync<T>(url, params);
  }
      
  const getAsync = async (params? : object[]) => {
    return await httpGetAsync<T>(url, params);
  }
      
  const addAsync = async (data: T, params? : object[]) =>{
    return await httpPostAsync(url, data, params);
  }
      
  const updateAsync = async (data: T, params? : object[]) => {
    return await httpPutAsync(url, data, params);
  }
      
  const deleteAsync = async (params? : object[]) => {
    return await httpDeleteAsync<T>(url, params);
  }

  return {
    getAllAsync,
    getAsync,
    addAsync,
    updateAsync,
    deleteAsync
  }
}