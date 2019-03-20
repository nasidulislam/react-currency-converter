import React, {Component} from 'react';
import '../styles/App.scss';

// component input
import Header from './Header';
import CurrencyInput from "./CurrencyInput";
import Error from './Error';

class App extends Component {
	constructor() {
		super();
		this.state = {
			currencyList: {},
			isError: false
		};
	}

	componentDidMount() {
		fetch("https://free.currencyconverterapi.com/api/v6/currencies?apiKey=96625d6e640e0fb52e7a")
			.then(res => res.json())
			.then(
				(currencyList) => {
					this.setState({ currencyList });
				},
				(error) => {
					this.setState({ isError: true });
				}
			)
	}

	render() {
		return (
			<div className="app">
				<Header mainText="Currency Converter" subText="Easy to go conversions" />

				<div className="app-container-container">
					{this.state.isError ? <Error /> : <CurrencyInput currencyList={this.state.currencyList} />}
				</div>
			</div>
		);
	}
}

export default App;
