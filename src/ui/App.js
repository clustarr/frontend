import React, {Component} from 'react';
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Home, Memory, MoreVert} from '@material-ui/icons';
import CssBaseline from "@material-ui/core/CssBaseline";
import HostsComponent from "./components/HostsComponent";
import {withStyles} from "@material-ui/core/styles";
import TasksComponent from "./components/TasksComponent";
import {getTasks} from "../redux/actions/get-tasks-action";
import {connect} from "react-redux";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AnsibleApi from "../api/AnsibleApi";
import Tooltip from "@material-ui/core/Tooltip";
import TitleComponent from "./components/TitleComponent";
import RkeRemoveConfirmationDialog from "./components/RkeRemoveConfirmationDialog";


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: 'auto'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    title: {
        flexGrow: 1
    },
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayComponent: <HostsComponent/>,
            anchorEl: null,
            dialogOpen: false
        };
    }

    componentDidMount() {
        this.props.getTasks();
        this.interval = setInterval(this.props.getTasks, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

    setupProxmox = async () => {
        this.handleMoreMenuClose();

        await AnsibleApi.runPlaybook({
            "playbook": "setup-proxmox.yml"
        });
    }

    rkeUp = async () => {
        this.handleMoreMenuClose();

        await AnsibleApi.runPlaybook({
            "playbook": "rke-up.yml"
        });
    }

    rkeRemove = async () => {
        this.handleMoreMenuClose();

        this.setState({
            dialogOpen: true
        })
    }

    handleMoreMenuClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleMoreMenuClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        })
    }

    handleDialogOk = async () => {
        this.handleDialogClose();

        await AnsibleApi.runPlaybook({
            "playbook": "rke-remove.yml"
        });
    }

    countRunningTasks = () => {
        return this.props.tasks.filter(task => !(
            task.state === "SUCCESS" ||
            task.state === "FAILURE" ||
            task.state === "REVOKED"
        )).length;
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <TitleComponent title="clustarr-frontend" count={this.countRunningTasks()} />

                {
                    this.state.dialogOpen &&
                    <RkeRemoveConfirmationDialog
                        handleClose={this.handleDialogClose}
                        handleOk={this.handleDialogOk}
                    />
                }

                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap className={classes.title}>
                                clustarr-frontend
                            </Typography>
                            <IconButton
                                aria-label="open more menu"
                                aria-haspopup="true"
                                onClick={this.handleMoreMenuClick}
                                color="inherit"
                            >
                                <MoreVert/>
                            </IconButton>
                            <Menu
                                id="more-menu-appbar"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleMoreMenuClose}
                            >
                                <Tooltip title="Run the setup-proxmox.yml playbook">
                                    <MenuItem onClick={this.setupProxmox}>Setup Proxmox</MenuItem>
                                </Tooltip>
                                <Tooltip title="Bring the cluster up">
                                    <MenuItem onClick={this.rkeUp}>RKE up</MenuItem>
                                </Tooltip>
                                <Tooltip title="Teardown the cluster and clean cluster nodes">
                                    <MenuItem onClick={this.rkeRemove}>RKE remove</MenuItem>
                                </Tooltip>
                            </Menu>
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
                                        <Badge
                                            badgeContent={this.countRunningTasks()}
                                            color="primary"
                                        >
                                            <Memory/>
                                        </Badge>
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

const mapStateToProps = (state) => ({
    tasks: state.tasksReducer.tasks
});

const mapDispatchToProps = {
    getTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles, { withTheme: true })(App)
);
