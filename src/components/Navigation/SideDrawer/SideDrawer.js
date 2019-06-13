import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxs from '../../../hoc/Auxs';

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer,classes.Open];

    }
    return (
        <Auxs>
            <Backdrop clicked={ props.closed } show={ props.open }/>
            <div className={ attachedClasses.join(' ') }>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxs>
    );

};

export default sideDrawer;