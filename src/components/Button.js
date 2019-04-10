import React from 'react';
import '../styles/Button.scss';

class Button extends React.Component {
	render() {
		return(
			<div className="button-container structure" onClick={this.props.onCickHandler}>
				<button
					className={this.props.buttonClass}
					type={this.props.buttonType}
				>{this.props.buttonText}</button>
			</div>
		)
	}
}

export default Button;
