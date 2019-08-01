import React, { Component } from 'react';
import List1 from './List1';
import List2 from './List2';
import List3 from './List3';
import axios from "axios";

//style
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';



export class PackingList extends Component {
  state={
  "Jackets/Coats":false,
  "T-shirts":false,
  "Sleepwear":false,
  "Undershirt":false,
  "Dresses":false,
  "Sweaters":false,
  "Swimsuits":false,
  "Shorts":false,
  "Pants":false,
  "Jeans":false,
  "Skirts":false,
  "Socks":false,
  "Underwear":false,
  "Stocking":false,
  "Scarves":false,
  "Gloves":false,
  "Hats":false,
  "Belts":false,
  "Ties":false,
  "Jewelry" :false,
  "Sandals":false,
  "Hiking shoes":false,
  "Walking shoes":false,
  "Umbrella": false,
  "Toothbrush":false,
  "Face cleanser":false,
  "Hairstyling tools":false,
  "Brush":false,
  "Shampoo/conditioner":false,
  "Deodorant":false,
  "Soap":false,
  "Dental floss":false,
  "Toothpaste":false,
  "Birth control":false,
  "Makeup remover":false,
  "Makeup":false,
  "Shaving supplies":false,
  "Contact lenses":false,
  "Moisturizer":false,
  "Sunscreen":false,
  "Face lotion/gel":false,
  "Pain relievers":false,
  "Medications":false,
  "Insect repellent":false,
  "First-aid ointment":false,
  "Bandages":false,
  "Hand sanitizer":false,
  "Vitamins":false,
  "Cell phone":false,
  "Laptop":false,
  "Electronic chargers":false,
  "Plug adaptor":false,
  "List of medications":false,
  "Copies of passport/creditcard/etc.":false,
  "Travel pillow":false,
  "Cash":false,
  "Credit/ATM cards":false,
  "Passport/visa/ID":false,
  "Camera":false,
  "Ear plugs/eye mask":false,
  "Video/music player":false,
  "Earbuds/headphones":false,
  "Books/E-books":false,
  "Insurance cards":false,
  "Guidebook":false,
  "House/car keys":false,
  message:"",
  packingListId: undefined
  }

  handleChange=(e)=>{
    this.setState({[e.target.value]:e.target.checked})
  }

  handleSave = () => {
    let items = []
    for(let key in this.state){
      if(this.state[key] === true){
        items.push(key)
      }
    }
    axios.post(`/api/packingList/${localStorage.getItem("tripId")}`,{items}).then((res)=>{
      this.setState({message:res.data.message})
      this.setState({packingListId:res.data.packingListId})
    })

  }

  handleUndo = ()=>{
    axios.put(`/api/packingList/${this.state.packingListId}`,{items:[]}).then((res)=>{
      console.log(res.data)
      this.getData(true)
    })
  }

  getData = (isUndo) => {
    axios.get(`/api/packingList/${localStorage.getItem("tripId")}`).then(response =>{
      
      this.setState({packingListId:response.data._id})
      if(isUndo){
        for(let key in this.state){
          if(key !== "message" && key !== "packingListId" && this.state[key]){
            this.setState({[key]:false})
          }
        }
      }else{
        response.data.items.forEach(item=>{
          this.setState({[item]: true})
        })
        
      }
    
    })
    .catch(err => {
      console.log(err);
    });
  };

  componentDidMount(){
    this.getData(false);
  }

  render() {
    return (
  <Container >
    <div >
        <Typography component="h1" variant="h5" style={{margin:"1%"}}>
        Packing List
        </Typography>
     </div>
    
     <form onSubmit={this.handleSubmit}>

    {this.state.packingListId ? <Button variant="contained" size="small" style={{marginLeft:"1%", marginBottom:'1%'}} onClick={this.handleSave} >
        <SaveIcon />
        Update
      </Button>: <Button variant="contained" size="small" style={{marginLeft:"1%", marginBottom:'1%'}} onClick={this.handleSave} >
        <SaveIcon />
        Save
      </Button>}
     
      
      <Button variant="contained" size="small" style={{marginLeft:"1%", marginBottom:'1%'}} onClick={this.handleUndo} >
      <i className="fas fa-undo"></i>
        Undo
      </Button>
      {/* {this.state.message} */}

     <Grid
  container
  direction="row"
  justify="space-around"
  alignItems="flex-start"
>
<Paper ><List1 handleChange={this.handleChange} {...this.state}  /></Paper>
<Paper><List2 handleChange={this.handleChange} {...this.state}  /></Paper>
<Paper><List3 handleChange={this.handleChange} {...this.state}  /></Paper>

</Grid>
     </form>
    </Container>
    )
  }
}

export default PackingList
