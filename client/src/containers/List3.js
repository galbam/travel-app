import React from 'react'

//style
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const List3 = (props) =>{
  const carryOn = [
    "Cell phone",
    "Laptop",
    "Electronic chargers",
    "Plug adaptor",
    "List of medications",
    "Copies of passport/creditcard/etc.",
    "Travel pillow",
    "Cash",
    "Credit/ATM cards",
    "Passport/visa/ID",
    "Camera",
    "Ear plugs/eye mask",
    "Video/music player",
    "Earbuds/headphones",
    "Books/E-books",
    "Insurance cards",
    "Guidebook",
    "House/car keys",
    ];
    

    return (
     
<Table size="small" >
 <TableHead>
   <TableRow >
    <TableCell align="center" style={{background:"#E53C38",color:"white", width:'13vw'}}><i className="fas fa-shopping-bag"></i> 
    <br />CARRY-ON</TableCell>
   </TableRow>
   <TableRow >
    <TableCell align="center"><i class="fas fa-check"></i></TableCell>
    <TableCell align="center">Item</TableCell>
    
   </TableRow>
  </TableHead>
   
  <TableBody>
     
       {carryOn.map(item => {
    return(
      <TableRow key={item} >
      <TableCell align="center">
      <Checkbox
     onChange={(e)=>props.handleChange(e)}
     value={item}
     checked={props[item]}
  />
     </TableCell>
    <TableCell align="center"  style={{width:'13vw'}}>{item}</TableCell>
    </TableRow>
    )
  })}
  </TableBody>
</Table>

  
    );
  };

  export default List3;

