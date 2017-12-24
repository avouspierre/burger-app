import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerContainer from './Containers/BurgerContainer/BurgerContainer';

class App extends Component {
  render() {
    return (
      <div>
          <Layout>
            <BurgerContainer/>

          </Layout>
      </div> 
    );
  }
}

export default App;
