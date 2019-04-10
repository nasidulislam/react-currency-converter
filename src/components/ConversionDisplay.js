import React from 'react';
import '../styles/ConversionDisplay.scss';

class ConversionDisplay extends React.Component {
    handleConvertedValue = () => {
        let convertedValueProp = this.props.convertedValue;

        if(convertedValueProp !== "") {
            let convertedValue = convertedValueProp[Object.keys(convertedValueProp)];
            let fromCurrencyValue = this.props.fromCurrencyValue;
            let fromCurrencyType = this.props.fromCurrencyType;
            let toCurrencyType = this.props.toCurrencyType;


            let totalConvertedValue = parseFloat(convertedValue * fromCurrencyValue).toFixed(3);
            let returnText = `${fromCurrencyValue} ${fromCurrencyType} is equal to ${totalConvertedValue} ${toCurrencyType}`;

            return returnText;
        }
    }

	render() {
        if(this.props.renderConvertedValue) {
            return(
                <div className="submit-and-display-container structure">
                    <div className="display">{this.handleConvertedValue()}</div>
                </div>
            )
        } else {
            return null
        }
	}
}

export default ConversionDisplay;
