import React from 'react';
import '../styles/ConversionDisplay.scss';

// component imports
import Button from './Button';

class ConversionDisplay extends React.Component {
    handleConvertedValue = () => {
        let convertedValueProp = this.props.convertedValue;

        if(convertedValueProp !== "") {
            let convertedValue = convertedValueProp[Object.keys(convertedValueProp)];
            let fromCurrencyValue = this.props.fromCurrencyValue;
            let fromCurrencyType = this.props.fromCurrencyType;
            let toCurrencyType = this.props.toCurrencyType;


            let totalConvertedValue = parseInt(convertedValue * fromCurrencyValue);
            let returnText = `${fromCurrencyValue} ${fromCurrencyType} is equal to ${totalConvertedValue} ${toCurrencyType}`;

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
				<div className="display">{this.handleConvertedValue()}</div>
			</div>
		)
	}
}

export default ConversionDisplay;