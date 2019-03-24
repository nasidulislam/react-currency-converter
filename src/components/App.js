import React, {Component} from 'react';
import '../styles/App.scss';

// component input
import Header from './Header';
import CurrencyInput from "./CurrencyInput";
import Error from './Error';
import ConversionDisplay from './ConversionDisplay';

class App extends Component {
	constructor() {
		super();
		this.state = {
			currencyList: {},
			isError: false,
			isLoaded: false
		};
	}

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

	render() {
        if(this.state.isLoaded) {
            return(
                <div className="app">
                    <Header mainText="Currency Converter" subText="Easy to go conversions" />

                    <div className="app-container-container">
                        <CurrencyInput currencyList={this.state.currencyList} />
	                    <ConversionDisplay />
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