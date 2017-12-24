import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform:'capitalize'}}>{igKey} : </span> {props.ingredients[igKey]}
            </li> ) 
            });

    return (
    <Aux>
        <h3>Your order</h3>
        <p>A delicious hamburger with</p>
        <ul>
            {ingSummary}
        </ul>
        <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
        <p>Continue Checkout ?</p>
        <Button clicked={props.cancelOrder} btnType='Danger'>CANCEL</Button>
        <Button clicked={props.continueOrder} btnType='Success'>CONTINUE</Button>   
    </Aux>);
}

export default orderSummary;