import React from 'react';
import '../styles/CurrencyInput.scss';

class CurrencyInput extends React.Component {
	render() {
		return (
			<div className="currency-input-container">
				<div className="currency-input">
					<input type="number" placeholder=" " />
					<label>Enter amount</label>
				</div>

				{console.log(this.props.currencyList.results)}

				<select>
					<option value=""></option>
					<option value="something">something</option>
				</select>
			</div>
		)
	}
}

export default CurrencyInput;