import React, {Component} from 'react';
import Auxs from '../../../hoc/Auxs';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

class Modal extends Component {


    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
    }

    componentWillUpdate() {
        console.log('[Modal] will update');
    }

    render() {

        return (
            <Auxs>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClose}/>
                <div style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
                     className={classes.Modal}>
                    {this.props.children}
                </div>
            </Auxs>
        );
    }
}

export default Modal;