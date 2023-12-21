import { httpDeleteAsync, httpGetAllAsync, httpGetAsync, httpPostAsync, httpPutAsync } from "../http/HTTPClient"

export type useCrudApiReturn<T> = {
  getAllAsync: (params? : object | object[]) => Promise<T[]>,
  getAsync: (params? : object | object[]) => Promise<T> ,
  addAsync: (data: T, params? : object | object[]) => Promise<T>,
  updateAsync: (data: T, params? : object | object[]) => Promise<T>,
  deleteAsync: (params? : object | object[]) => Promise<T>,
}

export const useCrudApi = <T>(url: string): useCrudApiReturn<T> => {
  const getAllAsync = async (params? : object | object[]): Promise<T[]> => { 
    return await httpGetAllAsync<T>(url, getParams(params));
  }
      
  const getAsync = async (params? : object[] | object): Promise<T> => {
    return await httpGetAsync<T>(url, getParams(params));
  }
      
  const addAsync = async (data: T, params? : object[] | object): Promise<T> =>{
    return await httpPostAsync(url, data, getParams(params));
  }
      
  const updateAsync = async (data: T, params? : object[] | object): Promise<T> => {
    return await httpPutAsync(url, data, getParams(params));
  }
      
  const deleteAsync = async (params? : object[] | object): Promise<T>  => {
    return await httpDeleteAsync<T>(url, getParams(params));
  }

  const getParams = (params? : object[] | object) => {
    // Define se será query params ou router params. Feito dessa forma para diminuir a complexidade desse hook

    if(!params) return undefined;
    if(Array.isArray(params)) return { urlParams: params }
    else return { queryParams: params };
  }

  return {
    getAllAsync,
    getAsync,
    addAsync,
    updateAsync,
    deleteAsync
  }
}