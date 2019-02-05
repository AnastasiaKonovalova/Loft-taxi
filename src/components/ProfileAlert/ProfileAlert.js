import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

const ProfileAlert = (props) => {
    const { classes, header, body, btnText, linkTo } = props;

    return (
        <Grid container spacing={24} >
            <Grid item xs={12} className={`${classes.alignCenter} ${classes.fieldAlign}`}>
                <Typography variant='h4'>{header}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>{body}</Typography>
            </Grid>
            <Grid item xs={12} className={`${classes.alignLeft} ${classes.fieldAlign}`}>
                <Button component={Link} variant="outlined" color="primary" to={linkTo}>{btnText}</Button>
            </Grid>
        </Grid>
    )
};

ProfileAlert.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileAlert)