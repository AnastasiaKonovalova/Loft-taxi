import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {logout} from '../../actions';
import {getIsLoggedIn} from '../../reducers';


const styles = theme => ({
    grow: {
        flexGrow: 1,
    }
});


class Header extends PureComponent {
    handleLogout = () => {
        console.log('click logout')
        const { logout} = this.props;
        logout(false)
    }

    render(){
        const {isLoggedIn, classes} = this.props;

        return (
            <AppBar position='static' color='inherit'>
                <Toolbar>
                    <Typography variant='h5' color='default' className={classes.grow}>Loft Taxi</Typography>
                    <Button component={Link} to='/map' color='default'>Карта</Button>
                    <Button component={Link} to='/profile' color='default'>Профиль</Button>
                    <Button 
                        component={Link} 
                        to='/login' 
                        color='default' 
                        onClick={this.handleLogout}
                    >
                        {isLoggedIn ? 'Выйти' : 'Войти'}
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state),
});
const mapDispatchToProps = {logout};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header))

// export default withStyles(styles)(Header)

// <Link to={`/map`}>To Map</Link>
// <Link to={`/profile`}>To Profile</Link>
// <Link to={`/login`}>To Login</Link>
// <Button variant='contained' color='default' onClick={()=>console.log('click')}>Test</Button>
