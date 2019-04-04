import React from 'react';
import '../styles/CurrencyInput.scss';

// component imports
import Option from './Option';
import InputField from './InputField';

class CurrencyInput extends React.Component {
	render() {
        const currencyList = this.props.currencyList.results;
		return(
			<div className="currency-input-container" data-invalid-type={this.props.inputErrorType}>
                <h3>{this.props.headerText}</h3>

				<div className="input-and-dropdown">
                    <InputField
                        containerClassList="currency-input"
                        onChangeHandler={this.props.handleCurrencyAmountInput}
                        inputFieldType="number"
                        placeholderText="Enter Amount"
                    />

                    <select className="currency-select-dropdown" onChange={this.props.handleSelectCurrency}>
                    <option value="">Select Currency</option>
                    {Object.keys(currencyList).map(index => (
                        <Option
                            key={index}
                            index={index}
                            name={currencyList[index].currencyName}
                            symbol={currencyList[index].id}
                        />
                    ))}
                    </select>
                </div>
			</div>
		)
	}
}

export default CurrencyInput;