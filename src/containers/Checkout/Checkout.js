import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckotSummary/CheckotSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actionTypes from "../../store/actions";

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ings}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ ContactData }/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps,null)(Checkout);