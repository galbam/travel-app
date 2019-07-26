import React, { Component } from 'react';
import axios from "axios";
import Item from './Item';

class Inspiration extends Component {
  state = {
    items: [],
    findItems: []
  }

  componentDidMount() {
    this.getInspirationData("coffee", "root");
  }

  getInspirationData(value, source){

    axios
      .get(`/api/inspirations/${value}`)
      .then(response => {

        if(source === "root"){
          this.setState({
            items: response.data
          });
        }
        else if (source === "find"){
          this.setState({
            findItems: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  getInspiration = (event) => {

    let {value} = event.target;

    this.getInspirationData(value, "find");
  }

  handleKeyDown = (event) => {

    let { value } = event.target;

    if (event.key === 'Enter') {
      console.log('Enter...', value);
    }
  }

  handleLeave = (event) => {

    let { value } = event.target;

    const mappedValues = value.split(";");
    
    const newItems = this.state.items.slice();
    newItems.unshift({
      description: mappedValues[0],
      place_id: mappedValues[1]
    });

    this.setState({
      items: newItems
    });
    
  }

  render() {

    let content = "";
    if (this.state.findItems !== "" && this.state.findItems.length > 0){

      content = this.state.findItems.slice().map((value, index) => {
        return (
          <div key={index}>
            <option value={value.description + ";" + value.place_id} />
          </div>
        );
      });
    }

    

    return (
      <div>
        <h5>Inspiration Coffee</h5>

        <div>
          <label htmlFor="name">Name:</label>
          <input list="datalist" id="name" name="name" 
            onInput={this.getInspiration} 
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleLeave} />
          <datalist id="datalist">
            {content}
          </datalist>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Move to Container</th>
              </tr>
            </thead>
            <tbody>
              <Item items={this.state.items} />
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Inspiration;
