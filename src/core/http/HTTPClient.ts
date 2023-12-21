import axios from 'axios';

interface IRequestConfig {
  urlParams?   : object[],
  queryParams? : object,
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 15000,
   });

export async function httpGetAllAsync<T>(url: string, config? : IRequestConfig){ 
  return (await instance.get<T[]>(`${url}${getUrlParams(config?.urlParams)}`, {params: config?.queryParams})).data;
}

export async function httpGetAsync<T>(url: string, config? : IRequestConfig){
  return (await instance.get<T>(`${url}${getUrlParams(config?.urlParams)}`, {params: config?.queryParams})).data;
}

export async function httpPostAsync<T>(url: string, data: T, config? : IRequestConfig){
  return (await instance.post<T>(`${url}${getUrlParams(config?.urlParams)}`, data, {params: config?.queryParams})).data;
}

export async function httpPutAsync<T>(url: string, data: T, config? : IRequestConfig){
  return (await instance.post<T>(`${url}${getUrlParams(config?.urlParams)}`, data, {params: config?.queryParams})).data;
}

export async function httpDeleteAsync<T>(url: string, config? : IRequestConfig){
  return (await instance.delete<T>(`${url}${getUrlParams(config?.urlParams)}`, {params: config?.queryParams})).data;
}

function getUrlParams(params? : object[]) : string {
  let urlParams = "";
  if(params) params.forEach(v => urlParams + "/" + v.toString());

  return urlParams;
} 