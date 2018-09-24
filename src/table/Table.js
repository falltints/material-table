import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

const CustomTable = withStyles(() => ({
    /*root: {
        width: 'auto'
    }*/
}))(Table);

export default CustomTable;