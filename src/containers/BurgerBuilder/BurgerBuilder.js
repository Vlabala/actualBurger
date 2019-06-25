import React, {Component} from 'react';
import Auxs from '../../hoc/Auxs';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
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
        /*axios.get('ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            });*/
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
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


        let burger = <Spinner/>;
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
                    < BuildControls
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                    />
                </Auxs>);
        };
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
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
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));