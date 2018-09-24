import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const CustomTableCell = withStyles(theme => ({
    root: {
        padding: '0px',
        borderBottom: 'none',
        textAlign: 'center',
    },
    /*head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },*/
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default CustomTableCell;