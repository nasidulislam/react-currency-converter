import React from 'react';
import '../styles/ConversionDisplay.scss';

// component imports
import Button from './Button';

class ConversionDisplay extends React.Component {
    handleConvertedValue = () => {
        if(this.props.convertedValue !== 'undefined') {
            let convertedValue = this.props.convertedValue[Object.keys(this.props.convertedValue)];
            let fromCurrencyValue = this.props.fromCurrencyValue;
            let fromCurrencyType = this.props.fromCurrencyType;


            let totalConvertedValue = convertedValue * fromCurrencyValue;
            let returnText = `${fromCurrencyValue} ${fromCurrencyType} is equal to ${totalConvertedValue}`;

            return returnText;
        }
    }

	render() {
		return(
			<div className="submit-and-display-container" onClick={this.props.handleSubmit}>
				<Button buttonClass="button primary-button conversion-submit-button"
				        buttonText="Convert"
				        buttonType="submit"
				/>
				<div>{this.handleConvertedValue()}</div>
			</div>
		)
	}
}

export default ConversionDisplay;