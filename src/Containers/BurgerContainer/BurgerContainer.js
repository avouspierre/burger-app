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

import * as actionType from '../../store/actions';

class BurgerContainer extends Component {

    state = {
        purchase:false,
        loading:false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://react-my-burger-c5850.firebaseio.com/ingrediens.json')
        // .then(response => {
        //     this.setState({ingredients: response.data})
        // })
        // .catch(error =>{
        //     this.setState({error:true})
        // } )
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

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];

    //     const updatedCount = oldCount +1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     } 
    //     updatedIngredients[type] = updatedCount;
    //     const priceAdd = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = priceAdd + oldPrice;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount <= 0) { return;}

    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     } 
    //     updatedIngredients[type] = updatedCount;
    //     const priceAdd = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceAdd;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseCancelHandler = () => {
        this.setState({purchase:false});
    }

    purchaseContinueHandler = () => {
    //    const queryParams = [];
    //     for (let i in this.props.ings){
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
    //     }
    //     queryParams.push('price=' + this.props.pric);
    //     const queryString = queryParams.join('&');
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

        let burger = this.state.error ? <p>Ingredients can't be loader</p>:<Spinner/>;

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
        ings: state.ingredients, 
        pric: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionType.ADD_INGREDIENT, ingredientName: ingName}  ),
        onIngredientRemoved: (ingName) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: ingName } ),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerContainer,axios));