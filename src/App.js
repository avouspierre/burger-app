import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerContainer from './Containers/BurgerContainer/BurgerContainer';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';



class App extends Component {
  

  render() {
    return (
      <div>
          <Layout>
            <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/" exact component={BurgerContainer}/>
                
            </Switch>
          </Layout>
      </div> 
    );
  }
}

export default App;
 