import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
 

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandle =() => {
        const currentShowSide = this.state.showSideDrawer;
        this.setState({showSideDrawer: !currentShowSide});
    }

    render() {
        return(
        <Aux>
                <Toolbar 
                open={this.sideDrawerClosedHandle}/>
                <SideDrawer 
                    open= {this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandle}
                />
                <main className={classes.Content}>
                {this.props.children}</main>
            </Aux>
        )

    }
}

export default Layout;