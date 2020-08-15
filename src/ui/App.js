import React, {Component} from 'react';
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Home, Memory} from '@material-ui/icons';
import CssBaseline from "@material-ui/core/CssBaseline";
import HostsComponent from "./components/HostsComponent";
import {withStyles} from "@material-ui/core/styles";
import TasksComponent from "./components/TasksComponent";
import WebsocketComponent from "./components/WebsocketComponent";


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayComponent: <HostsComponent/>
        };
    }

    displayHosts = () => {
        this.setState({
            displayComponent: <HostsComponent/>
        })
    }

    displayTasks = () => {
        this.setState({
            displayComponent: <TasksComponent/>
        })
    }

    render() {
        const { classes } = this.props;
        
        let websocketBaseUrl = `ws://${process.env.REACT_APP_FLOWER_HOST}:${process.env.REACT_APP_FLOWER_PORT}/api/task/events`;

        return (
            <React.Fragment>
                <WebsocketComponent
                    url={`${websocketBaseUrl}/task-started/`}
                    suffix="started"
                    variant="info" />
                <WebsocketComponent
                    url={`${websocketBaseUrl}/task-succeeded/`}
                    suffix="succeeded"
                    variant="success" />
                <WebsocketComponent
                    url={`${websocketBaseUrl}/task-failed/`}
                    suffix="failed"
                    variant="error" />

                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                clustarr-frontend
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <Toolbar />
                        <div className={classes.drawerContainer}>
                            <List>
                                <ListItem button key="hosts" onClick={this.displayHosts}>
                                    <ListItemIcon>
                                        <Home/>
                                    </ListItemIcon>
                                    <ListItemText primary="Hosts" />
                                </ListItem>
                                <ListItem button key="tasks" onClick={this.displayTasks}>
                                    <ListItemIcon>
                                        <Memory/>
                                    </ListItemIcon>
                                    <ListItemText primary="Tasks" />
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <main className={classes.content}>
                        <Toolbar />
                        {this.state.displayComponent}
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
