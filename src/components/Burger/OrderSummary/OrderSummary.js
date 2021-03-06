import React, {Component} from 'react';
import Auxs from '../../../hoc/Auxs';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>;
            });

        return (
            <Auxs>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><b>Total Price: {this.props.totalPrice}</b></p>
                <p>Continue to Checkout?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.purchaseCancelled}>
                    CANCEL
                </Button>
                <Button
                    btnType="Success"
                    clicked={this.props.purchaseContinued}>
                    CONTINUE
                </Button>
            </Auxs>
        );
    };
}
    
export default OrderSummary;