import React, { Component } from 'react';

class Item extends Component {

  handleMove = () => {
    
  }

  render() {
    return (

        this.props.items.map((value, index) => {
          return (
            <tr key={index}>
              <td style={{ textAlign: "left" }}>{value.description}</td>
              <td style={{ textAlign: "center" }}><button style={{ fontSize: "1rem" }} onClick={this.handleMove} >Move</button></td>
            </tr>
          );
        })
      )}
}

export default Item;