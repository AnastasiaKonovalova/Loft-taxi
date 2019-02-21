import { myHttp } from './instance';

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