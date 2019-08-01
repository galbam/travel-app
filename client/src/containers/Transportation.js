import React, { Component } from 'react';

//style
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


// const transportation = [
//   { img: "../../public/images/Tokyo.jpg",
//     from: Berlin TXL.
//     to: Tokyo NRT,
//     date: ,
//     time:,
//   },
//   { img: "../../public/images/Osaka.jpg",
//     from:.
//     to: ,
//     date:,
//     time:,
//   },
//   { img: "../../public/images/Berlin.jpg",
//     from:.
//     to: ,
//     date:,
//     time:,
//   },
// ]




export default class Transportation extends Component {
  render() {
    return (
      <div>
      Transpotation
      <Grid xs={4}>
        <Paper>
      <Table >
       <TableHead >
         <TableRow >
          <TableCell align="center" style={{background:'', color:'white', width:'13vw'}}><i className="fas fa-tshirt"></i>
          {/* <img src="/images/bus.jpg" alt="test" width="10vw"/> */}
          </TableCell>
         </TableRow>

        </TableHead>
         
        <TableBody>
        <TableRow >
          <TableCell align="center"></TableCell>
         </TableRow>

           
            <TableRow >
            <TableCell align="left">
           </TableCell>

          <TableCell align="center" style={{width:'13vw'}}></TableCell>
          </TableRow>
           
        </TableBody>
      </Table>
      </Paper>
      </Grid>
      
      </div>
    )
  }
}
