import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';



var rows = [


];

export default function StockTable(props) {
  console.log(props.stocks)
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Symbol', headerName: 'Symbol', width: 100 },

    {
      field: 'Name', headerName: 'Name', width: 400,
      renderCell: (params) => {

        return <a href={"/" +params.getValue('Exchange')+"/"+ params.getValue('Symbol')}>{params.getValue('Name')}</a>
      }
    },
    {field : 'Exchange' , headerName: 'Exchange' , width: 150},
  ];

  rows = props.stocks.map((item, index) => {
    return { id: index, Symbol: item.symbol, Name: item.name , Exchange : item.exchange }
  })
  return (
    <div style={{ maxWidth: '100%', flexGrow: 0, flexBasis: '100%' }}>
      <DataGrid autoHeight showToolbar rows={rows} columns={columns} pageSize={100} checkboxSelection spacing={2} />
    </div>
  );
}
