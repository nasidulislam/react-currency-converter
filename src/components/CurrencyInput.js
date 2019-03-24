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
					<input type="number" placeholder="Enter amount" />
				</div>

                <select className="currency-select-dropdown">
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