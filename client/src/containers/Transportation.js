import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';



 
import React, { Component } from 'react';

class Transportation extends Component {

  state = {
    tableRows1: [],
    tableRows2: [],
    tableRows3: [],
    tableRows4: [],
    tableRows5: []
  
  }


handleClick = (message) => {

  console.log("click!!!!", message)

  if(message === "flight"){

    const newTableRow1 = this.state.tableRows1.slice();

    newTableRow1.push({column1: "", column2: ""})
    
    this.setState({
      tableRows1: newTableRow1
    });
  }

  if(message === "bus"){

    const newTableRow2 = this.state.tableRows2.slice();

    newTableRow2.push({column1: "", column2: ""})
    
    this.setState({
      tableRows2: newTableRow2
    });
  }
  if(message === "train"){

    const newTableRow3 = this.state.tableRows3.slice();

    newTableRow3.push({column1: "", column2: ""})
    
    this.setState({
      tableRows3: newTableRow3
    });
  }
  if(message === "ferry"){

    const newTableRow4 = this.state.tableRows4.slice();

    newTableRow4.push({column1: "", column2: ""})
    
    this.setState({
      tableRows4: newTableRow4
    });
  }
  if(message === "car"){

    const newTableRow5 = this.state.tableRows5.slice();

    newTableRow5.push({column1: "", column2: ""})
    
    this.setState({
      tableRows5: newTableRow5
    });
  }
}

  render() {

    const colum1 = this.state.tableRows1.map((c, index) => {
      return (
        <TableRow key={index}>
                  <TableCell align="left">
                    <TextField>{c.colum1}</TextField> 
                    </TableCell>
                  <TableCell align="right">
                    <TextField>
                    {c.column2}
                    </TextField>
                  </TableCell>
            </TableRow>
      );
    });
    const colum2 = this.state.tableRows2.map((c, index) => {
      return (
        <TableRow key={index}>
                  <TableCell align="left">
                    <TextField>{c.colum1}</TextField> 
                    </TableCell>
                  <TableCell align="right">
                    <TextField>
                    {c.column2}
                    </TextField>
                  </TableCell>
            </TableRow>
      );
    });
    const colum3 = this.state.tableRows3.map((c, index) => {
      return (
        <TableRow key={index}>
                  <TableCell align="left">
                    <TextField>{c.colum1}</TextField> 
                    </TableCell>
                  <TableCell align="right">
                    <TextField>
                    {c.column2}
                    </TextField>
                  </TableCell>
            </TableRow>
      );
    });
    const colum4 = this.state.tableRows4.map((c, index) => {
      return (
        <TableRow key={index}>
                  <TableCell align="left">
                    <TextField>{c.colum1}</TextField> 
                    </TableCell>
                  <TableCell align="right">
                    <TextField>
                    {c.column2}
                    </TextField>
                  </TableCell>
            </TableRow>
      );
    });
    const colum5 = this.state.tableRows5.map((c, index) => {
      return (
        <TableRow key={index}>
                  <TableCell align="left">
                    <TextField>{c.colum1}</TextField> 
                    </TableCell>
                  <TableCell align="right">
                    <TextField>
                    {c.column2}
                    </TextField>
                  </TableCell>
            </TableRow>
      );
    });




    return (
      
          <div style={{marginTop:"2%"}}>
     


 <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-evenly"
>
<div>
    <Card style={{width:"50vh", marginBottom:"20px"}}>
        <CardMedia
          style={{height: "20vh"}}
          image={require("../assets/flight.jpg")}
          title="Transportation"
        />
        <CardContent>

      <Table>
            
              {/* <TableRow></TableRow> */}
            {/* </TableHead> */}
            <TableHead />
            <TableBody>
            <TableRow >
                  <TableCell align="left">
                    <Typography gutterBottom variant="h5" component="h2" style={{marginTop:'5%'}}> 
                    Flight
                    </Typography>
                    </TableCell>
                  <TableCell align="right">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => this.handleClick("flight")} >
                   <AddIcon />
                   </Fab>
                   </TableCell>
            </TableRow>
            <TableRow >
                  <TableCell align="left"><TextField></TextField></TableCell>
                  <TableCell align="right"><TextField></TextField></TableCell>
            </TableRow>
            {colum1}
            </TableBody>
      </Table>
       </CardContent>
    </Card>
  </div>
  <div>
    <Card style={{width:"50vh", marginBottom:"20px"}}>
        <CardMedia
          style={{height: "20vh"}}
          image={require("../assets/bus.jpg")}
        />
        <CardContent>

      <Table>
      <TableHead />
            <TableBody>
            <TableRow >
                  <TableCell align="left">
                    <Typography gutterBottom variant="h5" component="h2" style={{marginTop:'5%'}}> 
                    Bus
                    </Typography>
                    </TableCell>
                  <TableCell align="right">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => this.handleClick("bus")} >
                   <AddIcon />
                   </Fab>
                   </TableCell>
            </TableRow>
            <TableRow >
                  <TableCell align="left"><TextField></TextField></TableCell>
                  <TableCell align="right"><TextField></TextField></TableCell>
            </TableRow>

            {colum2}
            </TableBody>
      </Table>
       </CardContent>
    </Card>
  </div>
  <div>
    <Card style={{width:"50vh", marginBottom:"20px"}}>
        <CardMedia
          style={{height: "20vh"}}
          image={require("../assets/trains.jpg")}
        />
        <CardContent>

      <Table>
      <TableHead />
            <TableBody>
            <TableRow >
                  <TableCell align="left">
                    <Typography gutterBottom variant="h5" component="h2" style={{marginTop:'5%'}}> 
                    Train
                    </Typography>
                    </TableCell>
                  <TableCell align="right">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => this.handleClick("train")} >
                   <AddIcon />
                   </Fab>
                   </TableCell>
            </TableRow>
            <TableRow >
                  <TableCell align="left"><TextField></TextField></TableCell>
                  <TableCell align="right"><TextField></TextField></TableCell>
            </TableRow>

            {colum3}
            </TableBody>
      </Table>
       </CardContent>
    </Card>
  </div>
  <div>
    <Card style={{width:"50vh", marginBottom:"20px"}}>
        <CardMedia
          style={{height: "20vh"}}
          image={require("../assets/ferry.jpg")}
        />
        <CardContent>

      <Table>
      <TableHead />
            <TableBody>
            <TableRow >
                  <TableCell align="left">
                    <Typography gutterBottom variant="h5" component="h2" style={{marginTop:'5%'}}> 
                    Ferry
                    </Typography>
                    </TableCell>
                  <TableCell align="right">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => this.handleClick("ferry")} >
                   <AddIcon />
                   </Fab>
                   </TableCell>
            </TableRow>
            <TableRow >
                  <TableCell align="left"><TextField></TextField></TableCell>
                  <TableCell align="right"><TextField></TextField></TableCell>
            </TableRow>

            {colum4}
            </TableBody>
      </Table>
       </CardContent>
    </Card>
  </div>
  <div>
    <Card style={{width:"50vh", marginBottom:"20px"}}>
        <CardMedia
          style={{height: "20vh"}}
          image={require("../assets/car.jpg")}
        />
        <CardContent>

      <Table>
      <TableHead />
            <TableBody>
            <TableRow >
                  <TableCell align="left">
                    <Typography gutterBottom variant="h5" component="h2" style={{marginTop:'5%'}}> 
                    Car
                    </Typography>
                    </TableCell>
                  <TableCell align="right">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => this.handleClick("car")} >
                   <AddIcon />
                   </Fab>
                   </TableCell>
            </TableRow>
            <TableRow >
                  <TableCell align="left"><TextField></TextField></TableCell>
                  <TableCell align="right"><TextField></TextField></TableCell>
            </TableRow>

            {colum5}
            </TableBody>
      </Table>
       </CardContent>
    </Card>
  </div>


  </Box>

  </div>


    )
  }
}

export default Transportation;
