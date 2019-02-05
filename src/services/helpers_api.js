import React from 'react';
import TextField from '@material-ui/core/TextField';
import { myHttp } from './instance';


export const renderTextField = ({
        type,
        name,
        label,
        input,
        placeholder,
        meta: {touched, invalid, error},
        ...custom
    }) => (
        <TextField
            label={label}
            placeholder={placeholder ? placeholder : label}
            margin='none'
            type={type}
            error={touched && error && true}
            helperText={touched && error}
            {...input}
            {...custom}
        />
)

export const checkAuth = ({username, password}) => {
    return myHttp(`/auth?username=${username.trim()}&password=${password.trim()}`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response)
};

export const loadAddressList = () => {
    return myHttp('/addressList', {
        method: 'GET',
        mode: 'cors'
    })
    .then(response =>  response)
};

export const loadCoords = ({address1, address2}) => {
    return myHttp(`/route?address1=${address1}&address2=${address2}`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response )
};