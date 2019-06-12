import React from 'react';
import Auxs from '../../../hoc/Auxs';
import Button from '../../UI/Button/Button';


const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey] }
                   </li>;
        });
  return (
      <Auxs>
          <h3>Your order</h3>
          <p>A delicious burger with the following ingredients</p>
          <ul>
              { ingredientSummary }
          </ul>
          <p><b>Total Price: { props.totalPrice }</b></p>
          <p>Continue to Checkout?</p>
          <Button
              btnType="Danger"
              clicked={ props.purchaseCancelled }>
              CANCEL
          </Button>
          <Button
              btnType="Success"
              clicked={ props.purchaseContinued }>
              CONTINUE
          </Button>
      </Auxs>
  )
};
export default orderSummary;