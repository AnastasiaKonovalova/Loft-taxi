import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import OrderForm from '../OrderForm';
import ProfileAlert from '../ProfileAlert';
import OrderAlert from '../OrderAlert';
import { getIsProfileFilled, getIsOrderMade } from '../../store/selectors';

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',

    },
    form: {
        margin: 30,
        maxWidth: 300,
        position: 'absolute',
        zIndex: 200,
        top: 70,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: theme.spacing.unit * 3,
    }
})

const OrderPage = (props) => {
    const { classes, isProfile, isOrderMade } = props;
    return (
        <Grid container spacing={0} className={classes.container} alignItems='center' justify='flex-start'>
            <Grid item xs={8}>
                <Paper className={classes.form}>
                    {isProfile && !isOrderMade && <OrderForm/>}
                    {isProfile && isOrderMade && <OrderAlert/>}
                    {!isProfile && 
                        <ProfileAlert
                            header='Заполните платежные данные'
                            body='Укажите информацию о банковской карте, чтобы сделать заказ.'
                            btnText='перейти в профиль'
                            linkTo='/profile'
                        />}
                    
                </Paper>
            </Grid>
        </Grid>
    ) 
}

OrderPage.propTypes = {
    isProfile: PropTypes.bool.isRequired,
    isOrderMade: PropTypes.bool,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isProfile: getIsProfileFilled(state),
    isOrderMade: getIsOrderMade(state)
});
const mapDispatchToProps = null;

const WrappedOrderPage = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(OrderPage);

export default WrappedOrderPage