import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/spinner';
import Input from '../../../Components/UI/Input/Input';

import { connect } from 'react-redux';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Name'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Street'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your postal Code'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Country'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Your e-Mail'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'cheapest',
                valid : true,
                validation: {},
            },
        },
        formIsValid: false,
        loading: false
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }


        if (rules.required) {
            isValid = value.trim() !==''  && isValid ;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid ;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid ;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
       this.setState({loading:true});
       const formData = {};
       for (let formElementId in this.state.orderForm) {
           formData[formElementId] = this.state.orderForm[formElementId].value;
       }
       const order = {
           ingredients: this.props.ings,
           price: this.props.pric,
           orderData: formData,
           
       }
       console.log(order);
       axios.post('/orders.json',order)
       .then(response => {
           this.setState({loading:false});
           this.props.history.push("/");}
        )
       .catch(error => this.setState({loading:false}))
    
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updateFormElement = {
            ...updateOrderForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        if (updateFormElement.validation) {
            updateFormElement.valid = this.checkValidity(updateFormElement.value,updateFormElement.validation);
            updateFormElement.touched=true;
        }
        updateOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updateOrderForm) {
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }


        this.setState({orderForm:updateOrderForm, formIsValid: formIsValid});


    }

    render() {
        const formElementsArray =[];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key, 
                config: this.state.orderForm[key]
            });

        }

        let orderSummary = ( 
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key= {formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid = {!formElement.config.valid}
                        touched = {formElement.config.touched}
                        shouldValidate = {formElement.config.validation}
                        changed= {(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        pric: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);