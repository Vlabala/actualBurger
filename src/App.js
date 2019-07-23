import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import ascyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const ascyncCheckout = ascyncComponent(()=>{
    return import('./containers/Checkout/Checkout');
});

const ascyncOrders = ascyncComponent(()=>{
    return import('./containers/Orders/Orders');
});

const ascyncAuth = ascyncComponent(()=>{
    return import('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount(){
        this.props.onTryAutoSignup();
    }
    render() {
        let routes =(
            <Switch>
                <Route path="/auth" component={ascyncAuth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/" />
            </Switch>

        );
        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path="/orders" component={ascyncOrders}/>
                    <Route path="/checkout" component={ascyncCheckout}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={ascyncAuth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    { routes }
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
