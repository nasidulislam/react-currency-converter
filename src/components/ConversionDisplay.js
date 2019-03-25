import React from 'react';
import '../styles/ConversionDisplay.scss';

// component imports
import Button from './Button';

class ConversionDisplay extends React.Component {
	render() {
		return(
			<div className="submit-and-display-container" onClick={this.props.handleSubmit}>
				<Button buttonClass="button primary-button conversion-submit-button"
				        buttonText="Convert"
				        buttonType="submit"
				/>
				<div>Here will go the display</div>
			</div>
		)
	}
}

export default ConversionDisplay;