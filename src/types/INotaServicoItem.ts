import { INotaServico } from "./INotaServico";
import { IServico } from "./servico";

export interface INotaServicoItem {
    id?: number;
    codNotaServicoItem: number;
    codNotaServico: number;
    notaServico?: INotaServico; 
    codServico: number;
    servico?: IServico; 
    valor: number;
    qtd: number;
    valorTotal: number;
}