import React from 'react';
import '../styles/CurrencyInput.scss';

// component imports
import Option from './Option';

class CurrencyInput extends React.Component {
	render() {
        const currencyList = this.props.currencyList.results;
		return(
			<div className="currency-input-container" data-invalid-type={this.props.inputErrorType}>
                <h3>{this.props.headerText}</h3>

				<div className="input-and-dropdown">
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
			</div>
		)
	}
}

export default CurrencyInput;