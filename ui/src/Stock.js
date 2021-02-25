import React from "react";
import {
  useParams ,
  useHistory ,
} from "react-router-dom";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function Stock() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const classes = useStyles();
  const history = useHistory();

  let { exchange , symbol } = useParams();
  const [strategy , setStrategy] = React.useState(0)
  const [strategies , setStrategies] = React.useState([])

  React.useEffect(()=>{
    async function getData(){
       await fetch('/strategy').then(response =>{
        if(response.ok){
          return response.json()
        }
      }).then(data => {
         setStrategies(data.strategies)
      })
      
    }
    getData()
  } , [])
 
  const handleStrategy = async () => {
    var obj = {strategy : strategy , symbol : symbol}
      await fetch('/setStrategy', {
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
      console.log(data)
      history.push("/stocks")
    })
  }
     
  const changeStrategy = (event) => {
    setStrategy(event.target.value)
  }

  return (
    
    <div align="center">
       <TradingViewWidget
    symbol={exchange + ":"+symbol}
    theme={Themes.DARK}
    />

<FormControl className={classes.formControl}>
        <InputLabel id="strategy">Strategy</InputLabel>
        <Select
          className={classes.selectEmpty}
          labelId="strategy_label"
          id="1"
          value={strategy}
          onChange={changeStrategy}
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          {strategies.map(item => {
            return <MenuItem value={item.id}>{item.name}</MenuItem>
          })}
        
        </Select>
        <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleStrategy}
      >
        Submit
      </Button>
        <FormHelperText>Select Strategy</FormHelperText>
      </FormControl>
    </div>
  );
}

export default Stock;