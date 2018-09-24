import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const CustomButton = withStyles(() => ({
    root: {
        minWidth: 54,
        minHeight: 28,
        padding: '0px',
        marginLeft: 6
    }
}))(Button);

export default CustomButton;