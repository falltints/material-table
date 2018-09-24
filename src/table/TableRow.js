import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

const CustomTableRow = withStyles(theme => ({
    root: {
        height: 35,
        borderBottom: '1px solid #dcdcdc'
    }
}))(TableRow);

export default CustomTableRow;