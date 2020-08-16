import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import HostComponent from "./HostComponent";
import AnsibleApi from "../../api/AnsibleApi";
import Fab from "@material-ui/core/Fab";
import {Add, Settings} from "@material-ui/icons";
import {withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import ChooseHostnameDialog from "./ChooseHostnameDialog";
import {connect} from "react-redux";
import {getHosts} from "../../redux/actions/get-hosts-action";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";


const styles = theme => ({
    fabDiv: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    fab: {
        margin: theme.spacing(1)
    },
    progress: {
        position: 'relative',
        top: theme.spacing(2),
        left: '50%'
    }
});


class HostsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        };
    }

    componentDidMount() {
        this.props.getHosts();
        this.interval = setInterval(this.props.getHosts, 4000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    openDialog = () => {
        this.setState({
            dialogOpen: true
        })
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        })
    }

    handleDialogOk = async (hostname) => {
        this.handleDialogClose();

        await AnsibleApi.runPlaybook({
            "playbook": "add-node.yml",
            "extra_vars": {
                "hostname": hostname
            }
        });
    }

    setupProxmox = async () => {
        await AnsibleApi.runPlaybook({
            "playbook": "setup-proxmox.yml"
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <ChooseHostnameDialog
                    isOpen={this.state.dialogOpen}
                    handleClose={this.handleDialogClose}
                    handleOk={this.handleDialogOk}
                />

                <div>
                    {
                        this.props.loaded ?
                            this.props.error ?
                                <Alert variant="outlined" severity="error">
                                    Hosts could not be loaded
                                </Alert>
                                :
                                this.props.hosts.length === 0 ?
                                    <Alert variant="outlined" severity="info">
                                        No Hosts available
                                    </Alert>
                                    :
                                    <Paper>
                                        <List>
                                            {
                                                this.props.hosts.map((host) =>
                                                    <HostComponent
                                                        key={host.hostname}
                                                        host={host} />
                                                )
                                            }
                                        </List>
                                    </Paper>
                            :
                            <CircularProgress className={classes.progress} />
                    }
                </div>

                <div className={classes.fabDiv}>
                    <Tooltip title="Setup Proxmox" aria-label="setup proxmox">
                        <Fab color="primary" className={classes.fab} onClick={this.setupProxmox}>
                            <Settings />
                        </Fab>
                    </Tooltip>
                    <Tooltip title="Add Host" aria-label="add host">
                        <Fab color="primary" className={classes.fab} onClick={this.openDialog}>
                            <Add />
                        </Fab>
                    </Tooltip>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    hosts: state.hostsReducer.hosts,
    error: state.hostsReducer.error,
    loaded: state.hostsReducer.loaded
});

const mapDispatchToProps = {
    getHosts
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles, { withTheme: true })(
        HostsComponent
    )
);
