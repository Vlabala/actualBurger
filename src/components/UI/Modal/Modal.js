import React from 'react';
import Auxs from '../../../hoc/Auxs';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

const modal = props =>(
    <Auxs>
        <Backdrop
            show={ props.show }
            clicked={ props.modalClose}/>
    <div style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
    }}
        className={ classes.Modal }>
        { props.children }
    </div>
    </Auxs>
);

export default modal;