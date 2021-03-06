import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckbox = withStyles(() => ({
    root: {
        padding: 2
    }
}))(Checkbox);

export default CustomCheckbox;