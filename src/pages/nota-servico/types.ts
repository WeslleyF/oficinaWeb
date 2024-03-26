import * as yup from 'yup';

export const notaServicoItemSchema = yup.object({
  codServico: yup.number().required().moreThan(0), 
  valor: yup.number().required(),
  qtd: yup.number().required(),
  valorTotal: yup.number()
}) 