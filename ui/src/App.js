import React from 'react';
import StockTable from './StockTable';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [filter , setFilter] = React.useState("All Stocks")
  const [data , setData] = React.useState(0)
  
  
  React.useEffect(() =>{
     async function getData(){
      // await fetch('/stocks').then(response =>{
      //   if(response.ok){
          
      //     return response.json()
      //   }
      // }).then(data => {
          
      //    setData(data)
      // })
      var obj = {filter : filter}
      await fetch('/stocks', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(response =>{
        if(response.ok){
        return response.json()
        }
    }).then(data => {
      setData(data)
    })
     }
     
    getData()
     
   
               // clearing interval
    
  } , [filter]);

  function handleFilter(event){
    setFilter(event.target.value)
  } 
  return (
  
    <div className="App">
      <FormControl className={classes.formControl}>
        <InputLabel id="filter">Filter</InputLabel>
        <Select
          labelId="filter_label"
          id="1"
          value={filter}
          onChange={handleFilter}
        >
          <MenuItem value="All Stocks">
            <em>All Stocks</em>
          </MenuItem>
          <MenuItem value={"Intraday Highs"}>New Intraday Highs</MenuItem>
          <MenuItem value={"Closing Highs"}>New Closing Highs</MenuItem>
          <MenuItem value={"Intraday Lows"}>New Intraday Lows</MenuItem>
          <MenuItem value={"Closing Lows"}>New Closing Lows</MenuItem>
        </Select>
        <FormHelperText>Stock Filter</FormHelperText>
      </FormControl>
      {console.log(data)}
      {data !== 0 && <StockTable stocks={data.stocks} />}
     
    </div>
  );
}

export default App;
