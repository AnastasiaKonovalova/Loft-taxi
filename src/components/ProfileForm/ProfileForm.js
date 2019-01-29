import React, {Component, Fragment} from 'react';
import {compose} from 'redux';
import { Field, reduxForm, change } from 'redux-form';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ProfileAlert from '../ProfileAlert';

import {renderTextField} from '../../helpers_api';
import {login, handleProfileSubmit, handleProfileClear} from '../../actions';
import {getIsLoggedIn, getProfile} from '../../reducers';


const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
    },
    form: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.unit * 3,
    },
    formcolumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    fieldAlign: {
        display: 'flex',
    },
    alignLeft: {
        justifyContent: 'flex-start'
    },
    alignCenter: {
        justifyContent: 'center'
    }
})


class ProfileForm extends Component {
    state = {
        isUpdated: false
    }

    requiredFields = ['cardName', 'cardNumber', 'expDate', 'cvv']

    handleSubmit = values => {
        const {isLoggedIn, handleProfileSubmit} = this.props;
        this.setState({
            ...this.state,
            isUpdated: true
        })        
        handleProfileSubmit({isLoggedIn, profile: {...values}})
    }

    handleClear = () => {
        const {handleProfileClear, change} = this.props;
        this.setState({
            isUpdated: false
        });
        this.requiredFields.forEach(field => change(field, ''))
        handleProfileClear()
    }

    renderForm = () => {
        const {classes, handleSubmit} = this.props;

        return (
            <Fragment>
                <Paper component='form' onSubmit={handleSubmit(this.handleSubmit)}>
                    <Grid container spacing={16} className={classes.form}>
                        <Grid item xs={12}>
                            <Typography variant='h4' className={`${classes.alignCenter} ${classes.fieldAlign}`}>Профиль</Typography>
                            <Typography variant='h6' className={`${classes.alignLeft} ${classes.fieldAlign}`}>Способ оплаты</Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <Field
                                name="cardName"
                                component={renderTextField}
                                label="Имя владельца"
                                type='text'
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Field
                                name="cardNumber"
                                component={renderTextField}
                                label="Номер карты"
                                type='number'
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Field
                                name="expDate"
                                component={renderTextField}
                                label="Дата окончания действия"
                                type='date'
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Field
                                name="cvv"
                                component={renderTextField}
                                label="CVV"
                                type='number'
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} className={`${classes.alignLeft} ${classes.fieldAlign}`}>
                            <Button variant="contained" color="primary" component='button' type='submit'>Сохранить</Button>
                        </Grid>
                        <Grid item xs={6} className={`${classes.alignLeft} ${classes.fieldAlign}`}>
                            <Button variant="contained" color="primary" component='button' onClick={this.handleClear}>Удалить данные</Button>
                        </Grid>
                    </Grid>
                </Paper>

            </Fragment>
        )
    }

    renderAlert = () => {
        const {classes} = this.props;
        return (
            <Fragment>
            <Paper className={classes.form}>
                <ProfileAlert
                    header='Профиль'
                    body='Платёжные данные обновлены. Теперь вы можете заказывать такси.'
                    btnText='перейти на карту'
                    linkTo='/map'
                />
            </Paper>
            </Fragment>
        )
    }

    render() {
        const {classes} = this.props;
        const {isUpdated} = this.state;
        return (
            <Grid container spacing={0} className={classes.container} alignItems='center' justify='center'>
                <Grid item xs={9}>
                    {isUpdated 
                        ? this.renderAlert()
                        : this.renderForm()
                    }
                </Grid>
            </Grid>
        )
    }
}

const profileSyncValidator = values => {
    const requiredFields = ['cardName', 'cardNumber', 'expDate', 'cvv'];
    const errors = {};
    requiredFields.forEach(field => {if(!values[field]) errors[field] = 'Это обязательное поле'})
    return errors
}

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state),
    initialValues: getProfile(state)
});
const mapDispatchToProps = {login, handleProfileSubmit, handleProfileClear, change};

const WrappedProfileForm = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    reduxForm({ form: 'profileform', validate: profileSyncValidator}),
)(ProfileForm);

export default WrappedProfileForm
