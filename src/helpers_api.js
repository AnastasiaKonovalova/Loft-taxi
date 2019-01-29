import React from 'react';
import TextField from '@material-ui/core/TextField';



export const renderTextField = ({
        type,
        name,
        label,
        input,
        meta: {touched, invalid, error},
        ...custom
    }) => (
        <TextField
            label={label}
            placeholder={label}
            margin='none'
            type={type}
            error={touched && error && true}
            helperText={touched && error}
            {...input}
            {...custom}
        />
)

export const checkAuth = ({username, password}) => {
    return fetch(`https://loft-taxi.glitch.me/auth?username=${username.trim()}&password=${password.trim()}`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
};

export const loadAddressList = () => {
    return fetch('https://loft-taxi.glitch.me/addressList', {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
};

export const loadCoords = ({address1, address2}) => {
    return fetch(`https://loft-taxi.glitch.me/route?address1=${address1}&address2=${address2}`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
};