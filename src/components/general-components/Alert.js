import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';



const Alerts = ({severity, message}) => {
    return (
        <Box my={1}>
            <Alert severity={severity}>{message}</Alert>
        </Box>
    )
}

export default Alerts;