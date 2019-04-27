import React, { Component, Fragment } from 'react';
import { Field, reduxForm, isSubmitting } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { login, testAuth } from '../../store/actions';
import { getIsLoggedIn } from '../../store/selectors';
import { renderTextField } from '../../services/helpers';

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: theme.spacing.unit * 3
  },
  fieldAlign: {
    display: 'flex'
  },
  alignLeft: {
    justifyContent: 'flex-start'
  },
  alignCenter: {
    justifyContent: 'center'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 192
  }
});

class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    testAuth: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  renderInputs = () => {
    const { classes } = this.props;

    return (
      <Fragment>
        <Grid item xs={12} className={`${classes.alignLeft} ${classes.fieldAlign}`}>
          <Field name='userName' component={renderTextField} label='Имя пользователя' type='text' fullWidth />
        </Grid>
        <Grid item xs={12} className={`${classes.alignLeft} ${classes.fieldAlign}`}>
          <Field name='userPassword' component={renderTextField} label='Пароль' type='password' fullWidth />
        </Grid>
      </Fragment>
    );
  };

  renderForm = () => {
    const { classes, handleSubmit, isSubmitting } = this.props;

    return (
      <Grid container spacing={0} className={classes.container} alignItems='center' justify='center'>
        <Grid item xs={8} sm={6} md={4}>
          <Paper component='form' onSubmit={handleSubmit(this.handleSubmit)}>
            <Grid container spacing={24} className={classes.form}>
              <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                <Typography variant='h4'>Войти</Typography>
              </Grid>
              {isSubmitting ? (
                <Grid item xs={12} className={classes.loader}>
                  <CircularProgress />
                </Grid>
              ) : (
                this.renderInputs()
              )}
              <Grid item xs={12} className={`${classes.alignLeft} ${classes.fieldAlign}`}>
                <Button variant='outlined' color='primary' type='submit' component='button'>
                  Войти
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  handleSubmit = values => {
    const { userName: username, userPassword: password } = values;
    const { testAuth } = this.props;

    testAuth({ username, password });
  };

  render() {
    const { isLoggedIn } = this.props;
    return <Fragment>{isLoggedIn ? <Redirect to='/map' /> : this.renderForm()}</Fragment>;
  }
}

const loginSyncValidator = values => {
  const errors = {};
  if (!values.userName) {
    errors.userName = 'Надо указать логин';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userName)) {
    errors.userName = 'Тут нужен ваш e-mail';
  }
  if (!values.userPassword) errors.userPassword = 'Надо указать пароль';
  return errors;
};

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  isSubmitting: isSubmitting('loginform')(state)
});
const mapDispatchToProps = { login, testAuth };

const WrappedLoginForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles),
  reduxForm({ form: 'loginform', validate: loginSyncValidator })
)(LoginForm);

export default WrappedLoginForm;
