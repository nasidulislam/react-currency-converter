import React from 'react';
import '../styles/App.scss';

// other imports
import '../styles/reset.scss';

// component input
import Header from './Header';
import CurrencyInput from "./CurrencyInput";
import Error from './Error';
import ConversionDisplay from './ConversionDisplay';
import CurrencyListDropdown from './CurrencyListDropdown';
import Button from './Button';

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
        convertedValue: "",
		renderConvertedValue: false
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

		if(fromCurrencyValue > 0) {
			this.setState({ fromCurrencyValue });
		}
    };

	handleFromCurrencyType = (event) => {
		let fromCurrencyType = event.target.value;

        this.setState({
			fromCurrencyType,
			renderConvertedValue: false
		});
	};

    handleToCurrencyType = (event) => {
        let toCurrencyType = event.target.value;

        this.setState({
			toCurrencyType,
			renderConvertedValue: false
		});
    }

    validateFromInputSet = (amount, type) => {
        if(amount === "" && type === "") {
			this.setState({
				fromErrorType: "amount-and-currency",
				renderConvertedValue: false
			});
            return false;
		} else if(type === "") {
			this.setState({
				fromErrorType: "currency",
				renderConvertedValue: false
			});
            return false;
		} else if(amount === "") {
			this.setState({
				fromErrorType: "amount",
				renderConvertedValue: false
			});
            return false;
		} else {
			this.setState({
				fromErrorType: "",
				renderConvertedValue: true
			});
            return true;
		}
    };

    validateToInputSet = (type) => {
        if(type === "") {
			this.setState({
				toErrorType: "currency",
				renderConvertedValue: false
			});
            return false;
		} else {
			this.setState({
				toErrorType: "",
				renderConvertedValue: true
			});
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

                        <div className="to-input-set-container structure" data-invalid-type={this.state.toErrorType}>
                            <h3 className="component-header">To</h3>
                            <CurrencyListDropdown
                                containerClassList="to-dropdown"
                                dropdownClassList="currency-select-dropdown"
                                onChangeHandler={this.handleToCurrencyType}
                                unselectedText="Select Currency"
                                theList={this.state.currencyList.results}
                            />
                        </div>

						<Button
							buttonClass="button primary-button conversion-submit-button"
							buttonText="Convert"
							buttonType="submit"
							onCickHandler={this.handleSubmit}
						/>

	                    <ConversionDisplay
							fromCurrencyType={this.state.fromCurrencyType}
							toCurrencyType={this.state.toCurrencyType}
							fromCurrencyValue={this.state.fromCurrencyValue}
							convertedValue={this.state.convertedValue}
							renderConvertedValue={this.state.renderConvertedValue}
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
