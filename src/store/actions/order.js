import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                console.log(error);
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionType.FETCH_ORDER_START,
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDER_SUCCESS,
        orders: orders,
    }
}


export const fetchOrdersFail = (error) => {
    return {
        type: actionType.FETCH_ORDER_FAIL,
        error: error,
    }
}


export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('orders.json')
             .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                    id: key})
                } 
                //this.setState({loading:false, orders: fetchedOrders})
                dispatch(fetchOrdersSuccess(fetchedOrders));
             })
             .catch(err => {
                dispatch(fetchOrdersFail(err));
             })
    }
}