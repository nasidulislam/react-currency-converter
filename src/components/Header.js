import React from 'react';
import '../styles/Header.scss';

// this is a stateless component, it doesn't need to be a class component

const Header = props => {
	return(
		<header className="app-header">
			<h1 className="app-header-main">{props.mainText}</h1>
			<span className="app-header-sub">{props.subText}</span>
		</header>
	)
};

export default Header;