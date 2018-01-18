import * as actionType from '../actions/actionTypes';

const initialState  = {
    orders: [],
    loading: false, 
    purchased: false,
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT:
        return {
            ...state,
           purchased: false,
        };


        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false, 
                purchased: true,
            };

        case actionType.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
            };

        case actionType.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            }

        case actionType.FETCH_ORDER_START:
            return {
                ...state,
                loading:true,
            }
        case actionType.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        case actionType.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
}

export default reducer;