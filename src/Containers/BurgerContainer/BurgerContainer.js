import React, {Component} from 'react';
import { connect } from 'react-redux';


import Aux from '../../hoc/Aux/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

import Spinner from '../../Components/UI/Spinner/spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as burgerBuilderActions from '../../store/actions/index';


class BurgerContainer extends Component {

    state = {
        purchase:false,
        loading:false,
     }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler =() => {
        this.setState({purchase:true});
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) => { return sum + el})

        //this.setState({purchasable:sum > 0});
        return sum > 0;
    }

    

    purchaseCancelHandler = () => {
        this.setState({purchase:false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');

    };


    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;

        if (this.state.loading) {
                orderSummary = <Spinner/>;
        }

        let burger = this.props.error ? <p>Ingredients can't be loader</p>:<Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded = {this.props.onIngredientAdded} 
                    ingredientRemoved = {this.props.onIngredientRemoved}
                    disabled = {disabledInfo} 
                    price = {this.props.pric}
                    purchasable = {this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ings} 
                    cancelOrder={this.purchaseCancelHandler}
                    continueOrder={this.purchaseContinueHandler}
                    price={this.props.pric}
                />);
        }
         
        return (
            <Aux>
                <Modal show = {this.state.purchase} modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients, 
        pric: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName) ),
        onInitIngredients:() => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:() => dispatch(burgerBuilderActions.purchaseInit()),
      }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerContainer,axios));