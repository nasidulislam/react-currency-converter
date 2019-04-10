import React from 'react';
import '../styles/CurrencyInput.scss';

// component imports
import InputField from './InputField';
import CurrencyListDropdown from './CurrencyListDropdown';

class CurrencyInput extends React.Component {
	render() {
        const currencyList = this.props.currencyList.results;
		return(
			<div className="currency-input-container structure" data-invalid-type={this.props.inputErrorType}>
				<h3 className="component-header">{this.props.headerText}</h3>

				<div className="input-and-dropdown">
                    <InputField
                        containerClassList="currency-input"
                        onChangeHandler={this.props.handleCurrencyAmountInput}
                        inputFieldType="number"
                        placeholderText="Enter Amount"
                    />

                    <CurrencyListDropdown
                        containerClassList="from-dropdown"
                        dropdownClassList="currency-select-dropdown"
                        onChangeHandler={this.props.handleSelectCurrency}
                        unselectedText="Select Currency"
                        theList={currencyList}
                    />
                </div>
			</div>
		)
	}
}

export default CurrencyInput;
