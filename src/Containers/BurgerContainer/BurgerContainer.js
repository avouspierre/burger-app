import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

import Spinner from '../../Components/UI/Spinner/spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 1,
    cheese: 1.3,
    meat: 1.5

}

class BurgerContainer extends Component {

    state = {
        ingredients: null,
        totalPrice : 0.00,
        purchasable: false,
        purchase:false,
        loading:false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-c5850.firebaseio.com/ingrediens.json')
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error =>{
            this.setState({error:true})
        } )
    }

    purchaseHandler =() => {
        this.setState({purchase:true});
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) => { return sum + el})

        this.setState({purchasable:sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        } 
        updatedIngredients[type] = updatedCount;
        const priceAdd = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = priceAdd + oldPrice;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) { return;}

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        } 
        updatedIngredients[type] = updatedCount;
        const priceAdd = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAdd;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelHandler = () => {
        this.setState({purchase:false});
    }

    purchaseContinueHandler = () => {
       const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        });

    };


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;

        if (this.state.loading) {
                orderSummary = <Spinner/>;
        }

        let burger = this.state.error ? <p>Ingredients can't be loader</p>:<Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo} 
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients} 
                    cancelOrder={this.purchaseCancelHandler}
                    continueOrder={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
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

export default withErrorHandler(BurgerContainer,axios);