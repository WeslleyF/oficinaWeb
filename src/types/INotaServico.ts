import { INotaServicoItem } from "./INotaServicoItem";
import { ICliente } from "./cliente";

export interface INotaServico {
    codNotaServico: number;
    dataCadastro: Date;
    dataPrestacao: Date;
    valor: number;
    itens?: INotaServicoItem[]; 
    codCliente: number;
    cliente?: ICliente; 
}