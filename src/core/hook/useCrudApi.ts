import { httpDeleteAsync, httpGetAllAsync, httpGetAsync, httpPostAsync, httpPutAsync } from "../http/HTTPClient"

export type useCrudApiReturn<T> = {
  getAllAsync: (params? : object[]) => Promise<T[]>,
  getAsync: (params? : object[]) => Promise<T> ,
  addAsync: (data: T, params? : object[]) => Promise<T>,
  updateAsync: (data: T, params? : object[]) => Promise<T>,
  deleteAsync: (params? : object[]) => Promise<T>,
}

export const useCrudApi = <T>(url: string): useCrudApiReturn<T> => {
  const getAllAsync = async (params? : object[]): Promise<T[]> => { 
    return await httpGetAllAsync<T>(url, params);
  }
      
  const getAsync = async (params? : object[]): Promise<T> => {
    return await httpGetAsync<T>(url, params);
  }
      
  const addAsync = async (data: T, params? : object[]): Promise<T> =>{
    return await httpPostAsync(url, data, params);
  }
      
  const updateAsync = async (data: T, params? : object[]): Promise<T> => {
    return await httpPutAsync(url, data, params);
  }
      
  const deleteAsync = async (params? : object[]): Promise<T>  => {
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