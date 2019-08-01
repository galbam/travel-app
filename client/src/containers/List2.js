import React from 'react'

//style
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const List2 = (props) =>{
  const toiletries = [
    "Toothbrush",
    "Face cleanser",
    "Hairstyling tools",
    "Brush",
    "Shampoo/conditioner",
    "Deodorant",
    "Soap",
    "Dental floss",
    "Toothpaste",
    "Birth control",
    "Makeup remover",
    "Makeup",
    "Shaving supplies",
    "Contact lenses",
    "Moisturizer",
    "Sunscreen",
    "Face lotion/gel",
    "Pain relievers",
    "Medications",
    "Insect repellent",
    "First-aid ointment",
    "Bandages",
    "Hand sanitizer",
    "Vitamins"
    ];

    return (

<Table size="small" >

 <TableHead>
   <TableRow >
    <TableCell align="center" style={{background:"#FC9712" , color:'white' , width:'13vw'}}><i className="fas fa-spray-can"></i>
    <br /> TOILETRIES</TableCell>
   </TableRow>
   <TableRow >
    <TableCell align="center" ><i class="fas fa-check"></i></TableCell>
    <TableCell align="center">Item</TableCell>
   </TableRow>
 </TableHead>
   
  <TableBody>
     
       {toiletries.map(item => {
    return(
      <TableRow key={item}>
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


  export default List2;

