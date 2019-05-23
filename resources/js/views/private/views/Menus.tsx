import * as React from 'react';
import api from '../../../services/api';
import AdminPageLoader from '../../../components/AdminPageLoader';
import {
  Paper,
  List,
  Grid,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Collapse
} from '@material-ui/core';

export default class Menus extends React.Component<any, any> {
  state = {
    menus: [],
    isLoading: null,
    open: true,
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  getMenus = () => {
    let menuData = [];
    this.setState({ isLoading: true });

    api.get('/menus')
      .then(response => {
        const data = response.data.data;

        data.map((menuItem, index) => {
          if (menuItem.id > 0) {

            if (menuData[menuItem.parentId] === undefined) {
              menuData[menuItem.parentId] = [];
              menuData[menuItem.parentId].push(menuItem);
            } else {
              menuData[menuItem.parentId].push(menuItem);
            }
          } else {
            menuData.push();
          }
        });

        console.log(menuData);
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({
          isLoading: false,
          menus: menuData
        });
      });
  }

  componentDidMount() {
    this.getMenus();
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <AdminPageLoader />;
    }

    return (
      <React.Fragment>
        <Grid container spacing={24} style={{ height: '100%' }}>
          <Grid item xs={6}>
            <Paper
              elevation={1}
              square={true}
            >
              <List>
                <ListItem button onClick={this.handleClick}>
                  <ListItemIcon>
                    <Icon>inbox</Icon>
                  </ListItemIcon>
                  <ListItemText inset primary="Inbox" />
                  {this.state.open
                    ? <Icon>expand_less</Icon>
                    : <Icon>expand_more</Icon>
                  }
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    <ListItem button style={{ paddingLeft: '32px' }}>
                      <ListItemIcon>
                        <Icon>star_border</Icon>
                      </ListItemIcon>
                      <ListItemText inset primary="Starred" />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={1}
              square={true}
              style={{ padding: '24px' }}
            >
              Other stuff
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}