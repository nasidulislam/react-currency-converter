import React from 'react';
import '../styles/CurrencyInput.scss';

// component imports
import Option from './Option';

class CurrencyInput extends React.Component {
	render() {
        const currencyList = this.props.currencyList.results;
		return(
			<div className="currency-input-container" data-invalid-type={this.props.inputErrorType}>
				<div className="currency-input" onChange={this.props.handleCurrencyAmountInput}>
					<input type="number" placeholder="Enter amount" />
				</div>

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
		)
	}
}

export default CurrencyInput;