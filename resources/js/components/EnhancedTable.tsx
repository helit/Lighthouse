import * as React from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Icon
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { color } from '../theme/Styles';

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

interface ITableHeadProps {
  numSelected?: number;
  order?: any;
  orderBy?: any;
  rowCount?: number;
  onRequestSort?: (event: any, property: any) => any;
  onSelectAllClick?: any;
  rows: any[];
}

class EnhancedTableHead extends React.Component<ITableHeadProps, any> {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      rows
    } = this.props;

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
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
          <TableCell />
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles: any = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.primary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar: any = props => {
  const { numSelected, classes, title, tooltipTerm } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete Selected">
            <IconButton aria-label="Delete Selected">
              <Icon>delete</Icon>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={`Add ${tooltipTerm}`}>
            <IconButton color="primary" aria-label={`Add ${tooltipTerm}`}>
              <Icon>add_circle</Icon>
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles: any = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component<any, any> {
  state = {
    order: (this.props.data.order)
      ? this.props.data.order
      : 'asc',
    orderBy: (this.props.data.orderBy)
      ? this.props.data.orderBy
      : this.props.data.rows[0].id,
    selected: [],
    data: (this.props.data.data)
      ? this.props.data.data
      : [],
  };

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

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  createRows = (data) => {
    let tableRows = [];

    data.map((row, index) => {
      let tableRow = []

      for (let prop in row) {
        if (prop !== 'id') {
          tableRow.push(row[prop]);
        }
      }
      tableRows.push(tableRow);
    });

    return tableRows;
  }

  render() {
    const { classes, title, tooltipTerm } = this.props;
    const { data, order, orderBy, selected } = this.state;
    const rows = this.createRows(data);

    return (
      <Paper square={true} elevation={1}>
        <EnhancedTableToolbar
          title={title}
          tooltipTerm={tooltipTerm}
          numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              rows={this.props.data.rows}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      key={n.id}
                      hover
                      selected={isSelected}
                    >
                      <TableCell
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {rows[n.id].map((value, key) => {
                        if (value === 'true') {
                          return (
                            <TableCell key={key}>
                              <Icon style={{ color: color.success }}>check_circle</Icon>
                            </TableCell>
                          );
                        } else if (value === 'false') {
                          return (
                            <TableCell key={key}>
                              <Icon style={{ color: color.error }}>remove_circle</Icon>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={key}>{value}</TableCell>
                          );
                        }
                      })}
                      <TableCell>
                        <Tooltip title={`${tooltipTerm} Settings`}>
                          <IconButton aria-label={`${tooltipTerm} Settings`}>
                            <Icon>settings</Icon>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(EnhancedTable);