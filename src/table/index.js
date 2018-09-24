import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {connect} from 'react-redux';

import Toolbar from './Toolbar';
import Table from './Table';
import TableRow from './TableRow';
import TableCell from './TableCell';
import TableHead from './TableHead';
import Checkbox from './Checkbox';
import Button from './Button';
import {getAlarmAction} from "../store/actionCreators";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { name: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { name: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { name: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { name: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { name: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        const { orderBy } = this.props;
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.state = {
            order: 'asc',
            orderBy: orderBy || 'id',
            selected: [],
            data: [
                createData('Cupcake', 305, 3.7, 67, 4.3),
                createData('Donut', 452, 25.0, 51, 4.9),
                createData('Eclair', 262, 16.0, 24, 6.0),
                createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
                createData('Gingerbread', 356, 16.0, 49, 3.9),
                createData('Honeycomb', 408, 3.2, 87, 6.5),
                createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
                createData('Jelly Bean', 375, 0.0, 94, 0.0),
                createData('KitKat', 518, 26.0, 65, 7.0),
                createData('Lollipop', 392, 0.2, 98, 0.0),
                createData('Marshmallow', 318, 0, 81, 2.0),
                createData('Nougat', 360, 19.0, 9, 37.0),
                createData('Oreo', 437, 18.0, 63, 4.0),
            ],
            page: 0,
            rowsPerPage: 10,
        }
    };

    componentDidMount() {
        this.props.getAlarmData();
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleButtonClick = event => {
        event.stopPropagation();
        const value = event.target.value;
        this.props.getAlarmData();
        console.log(value);
    };

    render() {
        const { classes, ButtonText, title, data } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <Toolbar numSelected={selected.length} title={title}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            rows={rows}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    n = createData(n);
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            {
                                                Object.keys(n).map((key, index) => {
                                                    if (index === 0) {
                                                        return (
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                padding="none"
                                                                key={key}
                                                            >
                                                                {n[key]}
                                                            </TableCell>
                                                        )
                                                    } else {
                                                        return (
                                                            <TableCell numeric key={key}>{n[key]}</TableCell>
                                                        )
                                                    }
                                                })
                                            }
                                            {
                                                ButtonText.length > 0 && (<TableCell>
                                                    {
                                                        ButtonText.map((text) => {
                                                            return (
                                                                <Button
                                                                    variant='contained'
                                                                    color='primary'
                                                                    onClick={this.handleButtonClick}
                                                                    value={text}
                                                                    key={text}
                                                                >
                                                                    { text }
                                                                </Button>
                                                            )
                                                        })
                                                    }
                                                </TableCell>)
                                            }
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 35 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={[this.rowsPerPage]}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        data: state.alarm
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAlarmData() {
            const action = getAlarmAction();
            dispatch(action);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnhancedTable));