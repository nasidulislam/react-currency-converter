import React from 'react';

// component imports
import Option from './Option';

class CurrencyListDropdown extends React.Component {
    render() {
        const theList = this.props.theList;
        return (
            <div className={this.props.containerClassList}>
                <select className={this.props.dropdownClassList} onChange={this.props.onChangeHandler}>
                    <option value="">{this.props.unselectedText}</option>
                    {Object.keys(this.props.theList).map(index => (
                        <Option
                            key={index}
                            index={index}
                            name={theList[index].currencyName}
                            symbol={theList[index].id}
                        />
                    ))}
                </select>
            </div>
        )
    }
}

export default CurrencyListDropdown;