import React, {Component} from 'react';
import '../styles/App.scss';

// component input
import './CurrencyInput';
import CurrencyInput from "./CurrencyInput";

class App extends Component {
	constructor() {
		super();
		this.state = {
			currencyList: {}
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
					console.log('error');
				}
			)
	}

	render() {
		return (
			<div className="app">
				<header className="app-header">
					<h1 className="app-header-main">Currency Converter</h1>
					<span className="app-header-sub">Easy to go conversions</span>
				</header>

				<CurrencyInput currencyList={this.state.currencyList} />
			</div>
		);
	}
}

export default App;
