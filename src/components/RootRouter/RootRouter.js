import React, {PureComponent, Fragment} from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';

import Header from '../Header';
import PrivateRoute from '../PrivateRoute';
import LoginForm from '../LoginForm';
import MapContainer from '../MapContainer';
import ProfileForm from '../ProfileForm';


class RootRouter extends PureComponent {
    render(){
        return (
            <BrowserRouter>
                <Fragment>
                    <Header/>
                    <Switch>
                        <Route path='/login' component={LoginForm}/>
                        <Redirect path='/' exact to='login'/>
                        <PrivateRoute path={`/map`} component={MapContainer}/>
                        <PrivateRoute path={`/profile`} component={ProfileForm}/>
                    </Switch>
                </Fragment>
            </BrowserRouter>
        )
    }
}

export default RootRouter