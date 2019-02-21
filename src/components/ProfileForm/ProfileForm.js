import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ProfileAlert from '../ProfileAlert';
import { renderTextField } from '../../services/helpers';
import { login, handleProfileSubmit, handleProfileClear } from '../../store/actions';
import { getIsLoggedIn, getProfile } from '../../store/selectors';


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
});

const cardNameFormatter = value => {
    if(!value) return '';
    const onlyLetters = value.replace(/[^A-Za-z\s]/, '');
    return onlyLetters || ''
};

const cardNumberFormatter = value => {
    if(!value) return '';

    const onlyNum = value.replace(/[^\d\s]/g, '');
    const reg = /\d{1,4}/g;
    return onlyNum && onlyNum.substring(0, 16).match(reg).join(' ');
};

const cardNumberParser = value => {
    if(!value) return '';
    return value.replace(/\s/g, '');
};

const expDateFormatter = value => {
    if(!value || value === '/') return '';
    const onlyNum = value.replace(/[^\d]/g, '');
    if(onlyNum){
        let month = onlyNum.substring(0, 2);
        let year = onlyNum.substring(2, 4);
        if(+month > 12) month = '12';
        return `${month}/${year}`
    }
}

const cvvFormatter = value => {
    if(!value) return '';

    const onlyNum = value.replace(/[^\d]/, '');
    return onlyNum && onlyNum.substring(0, 3)
};

const profileSyncValidator = values => {
    const requiredFields = ['cardName', 'cardNumber', 'expDate', 'cvv'];
    const errors = {};
    requiredFields.forEach(field => {if(!values[field]) errors[field] = 'Это обязательное поле'});
    if(values['expDate']){
        let month = values['expDate'].substring(0, 2);
        let year = values['expDate'].substring(3);
        const date = new Date(+('20' + year), +month - 1);
        if(+date < Date.now()) errors['expDate'] = 'Дата указана неверно';
    }
    if( !/^\S+\s\S+$/ig.test(values['cardName']) ) errors['cardName'] = 'Укажите имя как на карте';
    if( values['cardNumber'] && values['cardNumber'].length < 16 ) errors['cardNumber'] = 'Номер карты должен состоять из 16 цифр';
    if( !/^\d{3}$/ig.test(values['cvv']) ) errors['cvv'] = 'CVV должен состоять из 3 цифр';
    return errors
}

class ProfileForm extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        handleProfileSubmit: PropTypes.func.isRequired,
        handleProfileClear: PropTypes.func.isRequired,
        change: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        initialValues: PropTypes.object,
        classes: PropTypes.object.isRequired
    }

    state = {
        isUpdated: false
    }

    requiredFields = ['cardName', 'cardNumber', 'expDate', 'cvv']

    handleSubmit = values => {
        const { isLoggedIn, handleProfileSubmit } = this.props;
        this.setState({
            ...this.state,
            isUpdated: true
        })        
        handleProfileSubmit({ isLoggedIn, profile: {...values} })
    }

    handleClear = () => {
        const { handleProfileClear, change } = this.props;
        this.setState({
            isUpdated: false
        });
        this.requiredFields.forEach(field => change(field, ''))
        handleProfileClear()
    }

    renderForm = () => {
        const { classes, handleSubmit } = this.props;

        return (
            <Fragment>
                <Paper component='form' onSubmit={handleSubmit(this.handleSubmit)}>
                    <Grid container spacing={16} className={classes.form}>
                        <Grid item xs={12}>
                            <Typography variant='h4' className={`${classes.alignCenter} ${classes.fieldAlign}`}>Профиль</Typography>
                            <Typography variant='h6' className={`${classes.alignLeft} ${classes.fieldAlign}`}>Способ оплаты</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Field
                                name="cardName"
                                component={renderTextField}
                                label="Имя владельца"
                                type='text'
                                required
                                fullWidth
                                format={cardNameFormatter}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Field
                                name="cardNumber"
                                component={renderTextField}
                                label="Номер карты"
                                required
                                fullWidth
                                format={cardNumberFormatter}
                                parse={cardNumberParser}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Field
                                name="expDate"
                                component={renderTextField}
                                label="Дата окончания действия"
                                required
                                fullWidth
                                placeholder='__ /__'
                                InputLabelProps={{ shrink: true }}
                                format={expDateFormatter}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Field
                                name="cvv"
                                component={renderTextField}
                                label="CVV"
                                required
                                fullWidth
                                format={cvvFormatter}
                            />
                        </Grid>
                        <Grid item xs={6} className={`${classes.alignLeft} ${classes.fieldAlign}`}>
                            <Button variant="contained" color="primary" component='button' type='submit'>Сохранить</Button>
                        </Grid>
                        <Grid item xs={6} className={`${classes.alignLeft} ${classes.fieldAlign}`}>
                            <Button variant="contained" color="primary" component='button' onClick={this.handleClear}>Удалить</Button>
                        </Grid>
                    </Grid>
                </Paper>

            </Fragment>
        )
    }

    renderAlert = () => {
        const { classes } = this.props;
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
        const { classes } = this.props;
        const { isUpdated } = this.state;
        return (
            <Grid container spacing={0} className={classes.container} alignItems='center' justify='center'>
                <Grid item xs={10} md={6}>
                    {isUpdated 
                        ? this.renderAlert()
                        : this.renderForm()
                    }
                </Grid>
            </Grid>
        )
    }
}


const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state),
    initialValues: getProfile(state)
});
const mapDispatchToProps = { login, handleProfileSubmit, handleProfileClear, change };

const WrappedProfileForm = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    reduxForm({ form: 'profileform', validate: profileSyncValidator}),
)(ProfileForm);

export default WrappedProfileForm
