export const stringUtils = {
  formatDocumento: (value?: string) => {
    if(!value) return "";
    const documento = value.replace(/\D/g, '');
  
    // CPF
    if (documento.length == 11) 
      return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
  
    // CNPJ
    return documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
  }
}