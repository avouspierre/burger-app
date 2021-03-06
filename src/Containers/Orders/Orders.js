import React, { Component } from 'react';

import { connect} from 'react-redux';

import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

import Spinner from '../../Components/UI/Spinner/spinner';

class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrders();

    }

    render() {

        let orders =  <Spinner/>;

        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
            ))
        }
        
    

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.order.loading,
        orders:state.order.orders
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders : () => dispatch(actions.fetchOrders()),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));