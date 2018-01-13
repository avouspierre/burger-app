import * as actionType from './actions';


const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 1,
    cheese: 1.3,
    meat: 1.5

}


const initialState = {
    ingredients: {
        salad: 0, 
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice : 4.00,
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
        default:
            return state;
    }
} 

export default reducer;

