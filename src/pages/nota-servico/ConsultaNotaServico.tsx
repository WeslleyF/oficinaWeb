import { Typography } from "@mui/material";
import { useApiNotaServico } from "../../api/useAPINotaServico";
import { useState } from "react";
import { INotaServico } from "../../types/INotaServico";
import { INotaServicoItem } from "../../types/INotaServicoItem";
import { DataGrid } from "@mui/x-data-grid";
import { dateUtil } from "../../core/utils/dateUtils";
import { numberUtils } from "../../core/utils/numberUtils";

interface Iprops{
  notas: INotaServico[],   
}

export const ConsultaNotaServico = (props: Iprops) => {
  const apiNotaServico              = useApiNotaServico();
  const [notasItens, setNotasItens] = useState<INotaServicoItem[]>([]);

  const handleNotaClick = async (codNotaServico: number) => {
    setNotasItens(await apiNotaServico.getAsyncItens(codNotaServico));
  }

  return(
        <>
          <Typography variant="h6" component="h5">Consulta</Typography>

          <DataGrid autoHeight disableColumnFilter density="compact" disableRowSelectionOnClick={false} onRowClick={(params) => handleNotaClick(params.id as number)}
            sx={{marginTop: 1, width: '100%'}}
            rows={props.notas}
            columns={[
              { field: "codNotaServico", headerName: "Código", width: 90 },
              { field: "dataCadastro", headerName: "Data cadastro", width: 250, valueGetter: params => dateUtil.formatDateTime(params.value)},
              { field: "dataPrestacao", headerName: "Data prestação", width: 250, valueGetter: params => dateUtil.formatDateTime(params.value) },
              { field: "codCliente", headerName: "Cód cliente", width: 100, },
              { field: "cliente", headerName: "Cliente", width: 250, valueGetter: params => params.row.cliente?.nome },
              { field: "valor", headerName: "Valor", width: 200, valueGetter: params => numberUtils.formatDecimal(params.value)},
              ]}
            getRowId={(row) => row.codNotaServico}
            pageSizeOptions={[10]}
        />

         <DataGrid autoHeight disableColumnFilter density="compact" disableRowSelectionOnClick={false}
            sx={{marginTop: 1, width: '100%'}}
            rows={notasItens}
            columns={[
              { field: "codServico", headerName: "Código", width: 90 },
              { field: "descricao", headerName: "Serviço", width: 250, valueGetter: params => params.row.servico?.descricao },
              { field: "qtd", headerName: "Quantidade", width: 200, },
              { field: "valor", headerName: "Valor", width: 200,valueGetter: params => numberUtils.formatDecimal(params.value) },
              { field: "valorTotal", headerName: "Valor total", width: 200, valueGetter: params => numberUtils.formatDecimal(params.value) },
              ]}
            getRowId={(row) => row.codNotaServicoItem}
            pageSizeOptions={[10]}
        />
        </>
    )
}