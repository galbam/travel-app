import React from 'react'

//style
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';


const List1 = (props) =>{
  const clothing = [
  "Jackets/Coats",
  "T-shirts",
  "Sleepwear",
  "Undershirt",
  "Dresses",
  "Sweaters",
  "Swimsuits",
  "Shorts",
  "Pants",
  "Jeans",
  "Skirts",
  "Socks",
  "Underwear",
  "Stocking",
  "Scarves",
  "Gloves",
  "Hats",
  "Belts",
  "Ties",
  "Jewelry" ,
  "Sandals",
  "Hiking shoes",
  "Walking shoes",
  "Umbrella"
    ];


    return (
      
      <Table  size="small" >
       <TableHead >
         <TableRow >
          <TableCell align="center" style={{background:'#4DA651', color:'white', width:'13vw'}}><i className="fas fa-tshirt"></i>
          <br />CLOTHES/ACCESSORIES </TableCell>
         </TableRow>
         <TableRow >
          <TableCell align="center"><i class="fas fa-check"></i></TableCell>
          <TableCell align="center">Item</TableCell>
          
         </TableRow>
        </TableHead>
         
        <TableBody>
           
             {clothing.map(item => {
          return(
            <TableRow key={item} >
            <TableCell align="center">
            <Checkbox
          onChange={(e)=>props.handleChange(e)}
          checked={props[item]}
          value={item}
        />
           </TableCell>
          <TableCell align="center" style={{width:'13vw'}}>{item}</TableCell>
          </TableRow>
          )
        })}
           
        </TableBody>
      </Table>

  
    );
  };

  export default List1;

