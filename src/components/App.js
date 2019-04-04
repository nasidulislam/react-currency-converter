import React from 'react';
import '../styles/App.scss';

// component input
import Header from './Header';
import CurrencyInput from "./CurrencyInput";
import Error from './Error';
import ConversionDisplay from './ConversionDisplay';
import CurrencyListDropdown from './CurrencyListDropdown';

class App extends React.Component {
	state = {
		currencyList: {},
		hasCurrencyFetchError: false,
		hasCurrencyLoaded: false,
        fromCurrencyValue: "",
        fromCurrencyType: "",
        toCurrencyType: "",
        fromErrorType: "",
        toErrorType: "",
        convertedValue: ""
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
        let toCurrencyType = event.target.value;

        this.setState({ toCurrencyType });
    }

    validateFromInputSet = (amount, type) => {
        if(amount === "" && type === "") {
			this.setState({ fromErrorType: "amount-and-currency" });
            return false;
		} else if(type === "") {
			this.setState({ fromErrorType: "currency" });
            return false;
		} else if(amount === "") {
			this.setState({ fromErrorType: "amount" });
            return false;
		} else {
			this.setState({ fromErrorType: "" });
            return true;
		}
    };

    validateToInputSet = (type) => {
        if(type === "") {
			this.setState({ toErrorType: "currency" });
            return false;
		} else {
			this.setState({ toErrorType: "" });
            return true;
		}
    };

	handleSubmit = (event) => {
		event.preventDefault();
        const fromCurrencyValue = this.state.fromCurrencyValue;
        const fromCurrencyType = this.state.fromCurrencyType;

        const toCurrencyType = this.state.toCurrencyType;

        // handle FROM input sets
        var isfromInputSetValid = this.validateFromInputSet(fromCurrencyValue, fromCurrencyType);

        // handle TO input sets
        var isToInputSetValid = this.validateToInputSet(toCurrencyType);

        if(isfromInputSetValid && isToInputSetValid) {
            const query = "https://free.currencyconverterapi.com/api/v6/convert?q=" + fromCurrencyType + "_" + toCurrencyType  + "&compact=ultra&apiKey=96625d6e640e0fb52e7a";

            fetch(query)
                .then(res => res.json())
                .then(
                    (convertedValue) => {
					    this.setState({ convertedValue });
                    },

                    (error) => { console.log('error'); }
			)
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

                        <div className="to-input-set-container" data-invalid-type={this.state.toErrorType}>
                            <h3>To</h3>
                            <CurrencyListDropdown
                                containerClassList="to-dropdown"
                                dropdownClassList="currency-select-dropdown"
                                onChangeHandler={this.handleToCurrencyType}
                                unselectedText="Select Currency"
                                theList={this.state.currencyList.results}
                            />
                        </div>

	                    <ConversionDisplay
                            handleSubmit={this.handleSubmit}
                            fromCurrencyType={this.state.fromCurrencyType}
                            toCurrencyType={this.state.toCurrencyType}
                            fromCurrencyValue={this.state.fromCurrencyValue}
                            convertedValue={this.state.convertedValue}
                        />
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