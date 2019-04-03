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
        fromCurrencyValue: "",
        toCurrencyValue: "",
        fromCurrencyType: "",
        ToCurrencyType: "",
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

    handleFromCurrencyValue = (event) => {
        let fromCurrencyValue = event.target.value;

        this.setState({ fromCurrencyValue });
    };

	handleToCurrencyValue = (event) => {
		let toCurrencyValue = event.target.value;

        this.setState({ toCurrencyValue });
	};

	handleFromCurrencyType = (event) => {
		let fromCurrencyType = event.target.value;

        this.setState({ fromCurrencyType });
	};

    handleToCurrencyType = (event) => {
        let ToCurrencyType = event.target.value;

        this.setState({ ToCurrencyType });
    }

	handleSubmit = (event) => {
		event.preventDefault();
	};

	render() {
        if(this.state.hasCurrencyLoaded) {
            return(
                <div className="app">
                    <Header mainText="Currency Converter" subText="Easy to go conversions" />

                    <div className="app-container-container">
                        <CurrencyInput
                            headerText="From"
	                        currencyList={this.state.currencyList}
	                        handleSelectCurrency={this.handleFromCurrencyType}
	                        handleCurrencyAmountInput={this.handleFromCurrencyValue}
                            inputErrorType={this.state.inputErrorType}
                        />

                        <CurrencyInput
                            headerText="To"
	                        currencyList={this.state.currencyList}
	                        handleSelectCurrency={this.handleToCurrencyType}
	                        handleCurrencyAmountInput={this.handleToCurrencyValue}
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