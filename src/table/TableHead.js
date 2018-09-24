import React from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TableHead from '@material-ui/core/TableHead';

import TableRow from './TableRow';
import TableCell from './TableCell';
import Checkbox from './Checkbox';

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, rows, emptyCell } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.name}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.name ? order : false}
                            >
                                {
                                    orderBy === row.name ? (
                                        <Tooltip
                                            title="Sort"
                                            placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                            enterDelay={300}
                                        >
                                            <TableSortLabel
                                                active={true}
                                                direction={order}
                                                onClick={this.createSortHandler(row.name)}
                                            >
                                                {row.label}
                                            </TableSortLabel>
                                        </Tooltip>
                                    ) : (<span>{row.label}</span>)
                                }
                            </TableCell>
                        );
                    }, this)}
                    {
                        emptyCell && <TableCell>{''}</TableCell>
                    }
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;