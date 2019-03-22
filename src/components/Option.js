import React from 'react';

class Option extends React.Component {
    render() {
        return(
            <option>{this.props.name} {this.props.symbol}</option>
        )
    }
}

export default Option;