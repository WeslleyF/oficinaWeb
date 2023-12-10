import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    timeout: 15000,
   });

export async function httpGetAllAsync<T>(url: string, params? : object[]){ 
  return (await instance.get<T[]>(`${url}${getUrlParams(params)}`)).data;
}

export async function httpGetAsync<T>(url: string, params? : object[]){
  return (await instance.get<T>(`${url}${getUrlParams(params)}`)).data;
}

export async function httpPostAsync<T>(url: string, data: T, params? : object[]){
  return (await instance.post<T>(`${url}${getUrlParams(params)}`, data)).data;
}

export async function httpPutAsync<T>(url: string, data: T, params? : object[]){
  return (await instance.post<T>(`${url}${getUrlParams(params)}`, data)).data;
}

export async function httpDeleteAsync<T>(url: string, params? : object[]){
  return (await instance.delete<T>(`${url}${getUrlParams(params)}`)).data;
}

function getUrlParams(params? : object[]) : string {
  let urlParams = "";
  if(params) params.forEach(v => urlParams + "/" + v.toString());

  return urlParams;
} 