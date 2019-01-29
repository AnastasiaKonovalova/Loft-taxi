import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import { fetchAddressesRequest, fetchCoordsRequest, setIsOrderMade } from '../../actions';
import { getIsLoadingAddresses, getLoadErrorText, getMyAddresses, getIsLoadingCoords, getCoordsError } from '../../reducers';

const styles = theme => ({
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


class OrderForm extends Component {
    state = {
        address1: '',
        address2: '',
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleButtonClick = () => {
        const { fetchCoordsRequest, setIsOrderMade } = this.props;
        const { address1, address2 } =this.state;
        
        if(address1 && address2) fetchCoordsRequest({address1, address2});
        setIsOrderMade(true);
        this.setState({
            ...this.state, 
            address1: '',
            address2: '',
        })
    }

    componentDidMount(){
        const { fetchAddressesRequest } = this.props;
        fetchAddressesRequest();
    }

    render(){
        const { classes, isLoadingAddresses, errorText, MyAddresses, isLoadingCoords, errorCoords } = this.props;
        const { address1, address2 } =this.state;
        return (
            <Grid container spacing={24} >
                <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                    <Typography variant='h4'>Вызов такси</Typography>
                </Grid>

                {isLoadingAddresses && (
                    <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                        <Typography variant='body2'>Загрузка сохраненных пунктов...</Typography>
                    </Grid>
                )}
                {isLoadingCoords && (
                    <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                        <Typography variant='body2'>Строим маршрут....</Typography>
                    </Grid>
                )}
                {errorText && (
                    <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                        <Typography variant='body2'>{errorText}</Typography>
                    </Grid>
                )}
                {errorCoords && (
                    <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                        <Typography variant='body2'>{errorCoords}</Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <TextField
                        id="address-1"
                        name="address1"
                        select
                        label="Выберите пункт отправления"
                        value={this.state.address1}
                        onChange={this.handleChange}
                        margin="none"
                        fullWidth
                    >
                        <MenuItem value=''>Выберите пункт отправления</MenuItem>
                        {
                            MyAddresses.map(address => (
                                address2 === address
                                ? address
                                : <MenuItem key={address} value={address}>{address}</MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address-2"
                        name="address2"
                        select
                        label="Выберите пункт отправления"
                        value={this.state.address2}
                        onChange={this.handleChange}
                        margin="none"
                        fullWidth
                    >
                        <MenuItem value='' >Выберите пункт отправления</MenuItem>
                        {
                            MyAddresses.map(address => (
                                address1 === address
                                ? address
                                : <MenuItem key={address} value={address}>{address}</MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12} className={`${classes.alignLeft} ${classes.fieldAlign}`}>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        component='button'
                        disabled={!address1 || !address2}
                        onClick={this.handleButtonClick}
                    >
                        Вызвать такси
                    </Button>
                </Grid>
            </Grid>
        )
    }
}


const mapStateToProps = state => ({
    isLoadingAddresses: getIsLoadingAddresses(state),
    errorText: getLoadErrorText(state),
    MyAddresses: getMyAddresses(state),
    isLoadingCoords: getIsLoadingCoords(state),
    errorCoords: getCoordsError(state)
});
const mapDispatchToProps = { fetchAddressesRequest, fetchCoordsRequest, setIsOrderMade };

const WrappedOrderForm = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(OrderForm);

export default WrappedOrderForm