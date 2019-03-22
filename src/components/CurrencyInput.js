import React from 'react';
import '../styles/CurrencyInput.scss';

// component imports
import Option from './Option';

class CurrencyInput extends React.Component {
	render() {
        const currencyList = this.props.currencyList.results;
		return(
			<div className="currency-input-container">
				<div className="currency-input">
					<input type="number" placeholder=" " />
					<label>Enter amount</label>
				</div>

                <select>
                <option value="">Select Currency</option>
                {Object.keys(currencyList).map(index => (
                    <Option
                        key={index}
                        index={index}
                        name={currencyList[index].currencyName}
                        symbol={currencyList[index].currencSymbol}
                    />
				))}
                </select>
			</div>
		)
	}
}

export default CurrencyInput;