import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {getIsLoggedIn} from '../../reducers'


const PrivateRoute = (props) => {
    const {component: Component, isLoggedIn, ...rest} = props;
    return (
        <Route 
            {...rest}
            render={props => isLoggedIn
                ? <Component {...props}/>
                : <Redirect to='/login'/>
            }
        />
    )
}

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state),
});
const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)