import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import { 
    fetchAddressesRequest, 
    fetchCoordsRequest, 
    setIsOrderMade } from '../../store/actions';
import { 
    getIsLoadingAddresses, 
    getLoadErrorText, 
    getMyAddresses, 
    getIsLoadingCoords } from '../../store/selectors';

const styles = theme => ({
    fieldAlign: {
        display: 'flex',
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
})

class OrderForm extends Component {
    static propTypes = {
        fetchAddressesRequest: PropTypes.func.isRequired,
        fetchCoordsRequest: PropTypes.func.isRequired,
        setIsOrderMade: PropTypes.func.isRequired,
        isLoadingAddresses: PropTypes.bool,
        isLoadingCoords: PropTypes.bool.isRequired,
        errorText: PropTypes.string,
        errorCoords: PropTypes.string,
        MyAddresses: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired
    }

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
        const { fetchAddressesRequest, MyAddresses } = this.props;
        if(!MyAddresses || MyAddresses.length === 0) fetchAddressesRequest();
    }

    renderInputs = () => {
        const { 
            classes, 
            MyAddresses } = this.props;
        const { address1, address2 } =this.state;
        return (
            <Fragment>
                <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                    {
                        <TextField
                            id="address-1"
                            name="address1"
                            select
                            margin="normal"
                            label="Пункт отправления"
                            value={this.state.address1}
                            onChange={this.handleChange}
                            fullWidth
                        >
                            <MenuItem value=''>Пункт отправления</MenuItem>
                            {
                                MyAddresses.map(address => (
                                    address2 === address
                                    ? address
                                    : <MenuItem key={address} value={address}>{address}</MenuItem>
                                ))
                            }
                        </TextField>
                    }
                </Grid>
                <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                    {
                        <TextField
                            id="address-2"
                            name="address2"
                            select
                            margin="normal"
                            label="Пункт назначения"
                            value={this.state.address2}
                            onChange={this.handleChange}
                            fullWidth
                        >
                            <MenuItem value='' >Пункт назначения</MenuItem>
                            {
                                MyAddresses.map(address => (
                                    address1 === address
                                    ? address
                                    : <MenuItem key={address} value={address}>{address}</MenuItem>
                                ))
                            }
                        </TextField>
                    }
                </Grid>
            </Fragment>
        )
    }

    render(){
        const { 
            classes, 
            isLoadingAddresses, 
            errorText } = this.props;
        const { address1, address2 } =this.state;
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                    <Typography variant='h4'>Вызов такси</Typography>
                </Grid>
                {errorText && (
                    <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                        <Typography variant='body1'>{errorText}</Typography>
                    </Grid>
                )}

                {
                    isLoadingAddresses
                    ? <Grid item xs={12} className={classes.loader}><CircularProgress/></Grid>
                    : this.renderInputs()
                }

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
    isLoadingCoords: getIsLoadingCoords(state)
});
const mapDispatchToProps = { fetchAddressesRequest, fetchCoordsRequest, setIsOrderMade };

const WrappedOrderForm = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(OrderForm);

export default WrappedOrderForm