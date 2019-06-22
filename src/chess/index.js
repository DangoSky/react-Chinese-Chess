import React, { Component } from 'react';

class Chess extends Component {
  render() {
    return (
      <p>{this.props.info.name}</p>
    );
  }
}

export default Chess;