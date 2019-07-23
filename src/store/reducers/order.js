import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    orders: [],
    loading:false,
    purchased: false
};
const purchaseInit = ( state, action) => {
    return updateObject(state,{purchased: false});
};
const purchaseBurgerStart = ( state, action) => {
    return updateObject(state,{ loading: true });
};
const purchaseBurgerSuccess = ( state, action) => {
    const newOrder = updateObject(action.orderData,{id: action.orderId,});
    return updateObject(state,{
        loading:false,
        purchased: true,
        order:state.orders.concat(newOrder)
    });
};
const purchaseBurgerFailed = ( state, action) => {
    return updateObject(state,{loading: false});
};
const fetchBurgerStart = ( state, action) => {
    return updateObject(state,{loading: true});
};
const fetchBurgerSuccess = ( state, action) => {
    return updateObject(state,{
        orders:action.orders,
        loading:false
    });
};
const fetchBurgerFailed = ( state, action) => {
    return updateObject(state,{loading: false});
};
const reducer = (state = initialState,action) =>{
    switch (action.type){
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state,action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state,action);
        case actionTypes.FETCH_ORDERS_START: return fetchBurgerStart(state,action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchBurgerSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAILED:return fetchBurgerFailed(state,action);
        default: return state;
    }
};

export default reducer;