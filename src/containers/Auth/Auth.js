import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import Classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Mail'
                },
                value:'',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid:false,
                touched:false
            },
        },
        isSignUp:true
    };

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    };


    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp:!prevState.isSignUp}
        });
    };
    inputChangedHandler = (event, controlName) => {
        const updatedControl = updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],{
                value:event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true,
            })
        });
        this.setState({controls:updatedControl});

    };
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ));
        if(this.props.loading){
            form = <Spinner/>;
        }
        if(this.props.loading){
            form = <Spinner/>;
        }
        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let authPage = (
            <div className={Classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    { form }
                    { errorMessage }
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Перейти к {this.state.isSignUp ? 'регистрации': 'авторизации' }</Button>
            </div>
        );
        if(this.props.isAuthenticated){
            authPage =  <Redirect to={this.props.authRedirectPath} />
        }
        return authPage;
    }
}
const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath

    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);