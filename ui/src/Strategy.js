import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
export default function Strategy() {
  const [data , setData] = React.useState(0)
  
  React.useEffect(() =>{
    async function getData(){
     
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
   
 } , []);

  return (
    <div>
      
    </div>
  )
}
