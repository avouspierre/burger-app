import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address : {
            street : '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
           // alert('You continue !')
       this.setState({loading:true});
       const order = {
           ingredients: this.props.ingredients,
           price: this.props.price,
           customer: {
               name: 'Pierre L',
               address : {
                   street : 'Route de Tavers',
                   zipCode : '45190',
                   country: 'Tavers'
               },
               email: 'test@test.com'
           },
           deliveryMetho: 'fastest'
       }
       console.log(order);
       axios.post('/orders.json',order)
       .then(response => {
           this.setState({loading:false});
           this.props.history.push("/");}
        )
       .catch(error => this.setState({loading:false}))
    
    }

    render() {

        let orderSummary = (
            
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Your postal code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>);

        if (this.state.loading) {
                orderSummary = <Spinner/>;
        }

        return (
            <div className= {classes.ContactData}>
                <h4>Enter your contact ContactData</h4>
                {orderSummary}
            </div>
        )
    }

}

export default ContactData;