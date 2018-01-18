import * as actionType from '../actions/actionTypes';


const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 1,
    cheese: 1.3,
    meat: 1.5

}


const initialState = {
    ingredients: null,
    totalPrice : 4.00,
    error: false
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] :  state.ingredients[action.ingredientName] + 1 
                },
                totalPrice : INGREDIENTS_PRICE[action.ingredientName] + state.totalPrice


            };
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] :  state.ingredients[action.ingredientName] - 1 
                },
                totalPrice :  state.totalPrice - INGREDIENTS_PRICE[action.ingredientName] 


            };
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error:false,
                totalPrice:4
            };
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };

        default:
            return state;
    }
} 

export default reducer;

