import React from 'react';

class Option extends React.Component {
    render() {
        return(
            <option value={this.props.symbol}>{this.props.name}</option>
        )
    }
}

export default Option;