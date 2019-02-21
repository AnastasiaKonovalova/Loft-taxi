import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getIsLoggedIn } from '../../store/selectors';

const PrivateRoute = (props) => {
    const { component: Component, isLoggedIn, ...rest } = props;
    return (
        <Route 
            {...rest}
            render={props => isLoggedIn
                ? <Component {...props}/>
                : <Redirect to='/login'/>
            }
        />
    )
};

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.element
    ]).isRequired
}

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state),
});

export default connect(mapStateToProps, null)(PrivateRoute)