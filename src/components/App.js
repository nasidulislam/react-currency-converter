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
		hasCurrencyFetchError: false,
		hasCurrencyLoaded: false,
		selectedCurrency: "",
		currencyAmount: "",
        inputErrorType: ""
	};

	componentDidMount() {
		fetch("https://free.currencyconverterapi.com/api/v6/currencies?apiKey=96625d6e640e0fb52e7a")
			.then(res => res.json())
			.then(
				(currencyList) => {
					this.setState({
						currencyList,
						hasCurrencyLoaded: true
					});
				},
				(error) => {
					this.setState({ hasCurrencyFetchError: true });
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
			this.setState({ inputErrorType: "amount-and-currency" });
		} else if(currency === "") {
			this.setState({ inputErrorType: "currency" });
		} else if(amount === "") {
			this.setState({ inputErrorType: "amount" });
		} else {
			this.setState({ inputErrorType: "" });
		}
	};

	render() {
        if(this.state.hasCurrencyLoaded) {
            return(
                <div className="app">
                    <Header mainText="Currency Converter" subText="Easy to go conversions" />

                    <div className="app-container-container">
                        <CurrencyInput
	                        currencyList={this.state.currencyList}
	                        handleSelectCurrency={this.handleSelectCurrency}
	                        handleCurrencyAmountInput={this.handleCurrencyAmountInput}
                            inputErrorType={this.state.inputErrorType}
                        />
	                    <ConversionDisplay handleSubmit={this.handleSubmit} />
                    </div>
			    </div>
            );
        } else if (this.state.hasCurrencyFetchError) {
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