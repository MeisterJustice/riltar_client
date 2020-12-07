import React from 'react';
import Button from '@material-ui/core/Button';



const Buttons = ({ size, variant, color, click, text }) => {
    return (
        <Button size="large" onClick={click} fullWidth variant="contained" color="secondary">
            {text}
        </Button>
    )
}

export default Buttons;