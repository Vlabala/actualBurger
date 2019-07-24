import React, {Component} from 'react';
import Auxs from '../../hoc/Auxs';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';


export class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    }

    componentDidMount(){
        this.props.onInitIngredients();
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
      this.props.history.push({
          pathname: '/checkout'
      });
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }


        let burger = this.props.error ? <p>Ingredients can't be loaded </p> : <Spinner/>;
        let orderSummary = null;

        if(this.props.ings){

            orderSummary = <OrderSummary
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                totalPrice={this.props.price}
                ingredients={this.props.ings}/>;

            burger = (
                <Auxs>
                    <Burger
                        ingredients={this.props.ings}/>
                    <BuildControls
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                    />
                </Auxs>);
        };
        return (
            <Auxs>
                <Modal
                    modalClose={this.purchaseCancelHandler}
                    show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                { burger }
            </Auxs>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));