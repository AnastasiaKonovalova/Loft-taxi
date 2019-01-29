import React, { Fragment } from 'react';

import MyMap from '../MyMap';
import OrderPage from '../OrderPage';

const MapContainer = (props) => (
    <Fragment>
        <MyMap/>
        <OrderPage/>
    </Fragment>    
)

export default MapContainer