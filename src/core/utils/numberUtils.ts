export const numberUtils = {
  formatDecimal: (valor?: number, digits = 2) => {
    let numero = 0;
    if(valor) numero = valor;
    
    return numero.toLocaleString('pt-br', {minimumFractionDigits: digits});
  }  
}