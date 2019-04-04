import React from 'react';

class InputField extends React.Component {
    render() {
        return(
            <div className={this.props.containerClassList} onChange={this.props.onChangeHandler}>
                <input
                    className={this.props.inputFieldClassList}
                    type={this.props.inputFieldType}
                    placeholder={this.props.placeholderText}
                />
            </div>
        )
    }
}

export default InputField;