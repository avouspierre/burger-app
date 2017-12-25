import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
    // This could be a functional component
    // not a class required
    componentWillUpdate() {
            console.log('updated order summary');
    }

    render() {

        const ingSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform:'capitalize'}}>{igKey} : </span> {this.props.ingredients[igKey]}
            </li> ) 
            });

        return (
            <Aux>
        <h3>Your order</h3>
        <p>A delicious hamburger with</p>
        <ul>
            {ingSummary}
        </ul>
        <p>Total Price: <strong>{this.props.price.toFixed(2)}</strong></p>
        <p>Continue Checkout ?</p>
        <Button clicked={this.props.cancelOrder} btnType='Danger'>CANCEL</Button>
        <Button clicked={this.props.continueOrder} btnType='Success'>CONTINUE</Button>   
    </Aux>

        )
    }

}

export default OrderSummary;