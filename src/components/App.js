import React from 'react';
import '../styles/App.scss';

// component input
import Header from './Header';
import CurrencyInput from "./CurrencyInput";
import Error from './Error';
import ConversionDisplay from './ConversionDisplay';


class App extends React.Component {
	state = {
		currencyList: {},
		isError: false,
		isLoaded: false,
		selectedCurrency: "",
		currencyAmount: "",
        hasSelectedCurrencyError: false,
        hasCurrencyAmountError: false
	};

	componentDidMount() {
		fetch("https://free.currencyconverterapi.com/api/v6/currencies?apiKey=96625d6e640e0fb52e7a")
			.then(res => res.json())
			.then(
				(currencyList) => {
					this.setState({
						currencyList,
						isLoaded: true
					});
				},
				(error) => {
					this.setState({ isError: true });
				}
			)
	}

	handleSelectCurrency = (event) => {
		let selectedCurrency = event.target.value;

		this.setState({ selectedCurrency });
	};

	handleCurrencyAmountInput = (event) => {
		let currencyAmount = event.target.value;

		this.setState({ currencyAmount });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const amount = this.state.currencyAmount;
		const currency = this.state.selectedCurrency;

		if(amount === "" && currency === "") {
			this.setState({
                hasSelectedCurrencyError: true,
                hasCurrencyAmountError: true
            });
		} else if(currency === "") {
			this.setState({
                hasSelectedCurrencyError: true,
                hasCurrencyAmountError: false
            });
		} else if(amount === "") {
			this.setState({
                hasSelectedCurrencyError: false,
                hasCurrencyAmountError: true
            });
		} else {
			this.setState({
                hasSelectedCurrencyError: false,
                hasCurrencyAmountError: false
            });
		}
	};

	render() {
        if(this.state.isLoaded) {
            return(
                <div className="app">
                    <Header mainText="Currency Converter" subText="Easy to go conversions" />

                    <div className="app-container-container">
                        <CurrencyInput
	                        currencyList={this.state.currencyList}
	                        handleSelectCurrency={this.handleSelectCurrency}
	                        handleCurrencyAmountInput={this.handleCurrencyAmountInput}
                        />
	                    <ConversionDisplay handleSubmit={this.handleSubmit} />
                    </div>
			    </div>
            );
        } else if (this.state.isError) {
            return(
                <div className="app">
                    <Header mainText="Currency Converter" subText="Easy to go conversions" />

                    <div className="app-container-container">
                        <Error />
                    </div>
                </div>
            );
        } else {
            return(
                <Header mainText="Currency Converter" subText="Easy to go conversions" />
            );
        }
	}
}

export default App;