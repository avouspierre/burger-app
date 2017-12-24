import React from 'react';
import classes  from "./BuildControls.css";
import BuildControl from './BuildControl/BuildControl';


const controls = [
    { label:'Salad', type: 'salad'},
    { label:'Bacon', type: 'bacon'},
    { label:'Cheese', type: 'cheese'},
    { label:'Meat', type: 'meat'},
];

const buildControls = (props) => ( 
    <div className={classes.BuildControls}>
       <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        { controls.map(ct => (
            <BuildControl 
            key={ct.label} 
            label={ct.label} 
            added={() => props.ingredientAdded(ct.type)} 
            removed = {() => props.ingredientRemoved(ct.type)}
            disabled = {props.disabled[ct.type]}/>
        ))
        }
        <button className={classes.OrderButton}
        disabled = {!props.purchasable}
        onClick= {props.ordered}>ORDER</button>
    </div>
)

export default buildControls;