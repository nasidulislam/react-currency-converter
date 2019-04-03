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
        fromErrorType: "",
        toErrorType: ""
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

        // handle FROM input sets
        const fromCurrencyValue = this.state.fromCurrencyValue;
        const fromCurrencyType = this.state.fromCurrencyType;

        if(fromCurrencyValue === "" && fromCurrencyType === "") {
			this.setState({ fromErrorType: "amount-and-currency" });
		} else if(fromCurrencyType === "") {
			this.setState({ fromErrorType: "currency" });
		} else if(fromCurrencyValue === "") {
			this.setState({ fromErrorType: "amount" });
		} else {
			this.setState({ fromErrorType: "" });
		}

        // handle TO input sets
        const toCurrencyValue = this.state.toCurrencyValue;
        const ToCurrencyType = this.state.ToCurrencyType;

        if(toCurrencyValue === "" && ToCurrencyType === "") {
			this.setState({ toErrorType: "amount-and-currency" });
		} else if(ToCurrencyType === "") {
			this.setState({ toErrorType: "currency" });
		} else if(toCurrencyValue === "") {
			this.setState({ toErrorType: "amount" });
		} else {
			this.setState({ toErrorType: "" });
		}
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
                            inputErrorType={this.state.fromErrorType}
                        />

                        <CurrencyInput
                            headerText="To"
	                        currencyList={this.state.currencyList}
	                        handleSelectCurrency={this.handleToCurrencyType}
	                        handleCurrencyAmountInput={this.handleToCurrencyValue}
                            inputErrorType={this.state.toErrorType}
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