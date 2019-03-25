import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  
  shouldComponentUpdate(nextProps, nextState){
    return false
  }
  
  render() {
    let randDeg = Math.random()*(60)-30;
    let style = {
      transform: `rotate(${randDeg}deg)`
    }
    return (
      <div className="Card">
        <img src={ this.props.imageUrl} alt='card' style={style} />
      </div>
    );
  }
}

export default Card;