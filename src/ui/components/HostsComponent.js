import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import HostComponent from "./HostComponent";
import AnsibleApi from "../../api/AnsibleApi";
import Host from "../../data-classes/Host";
import Fab from "@material-ui/core/Fab";
import {Add, Settings} from "@material-ui/icons";
import {withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import ChooseHostnameDialog from "./ChooseHostnameDialog";
import HostGroups from "../../data-classes/HostGroups";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";


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
            hosts: [],
            dialogOpen: false,
            hostsLoaded: false
        };
    }

    async componentDidMount() {
        await this.getHosts();
        this.setState({
            hostsLoaded: true
        })
        this.interval = setInterval(this.getHosts, 4000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getHosts = async () => {
        let inventoryList = await AnsibleApi.listInventory();

        if (!inventoryList['_meta']) {
            return;
        }
        let allHosts = Object.keys(inventoryList['_meta']['hostvars'])

        let runningHosts = [];
        if (inventoryList['running']) {
            runningHosts = inventoryList['running']['hosts']
        }

        let hosts = [];
        for (let hostname of allHosts) {
            let host = new Host();
            host.hostname = hostname;
            host.running = runningHosts.includes(hostname);
            for (let group of [HostGroups.MASTERS, HostGroups.WORKERS, HostGroups.INDEPENDENTS]) {
                let groupHosts = []
                if (inventoryList[group]) {
                    groupHosts = inventoryList[group]['hosts']
                }
                if (groupHosts.includes(hostname)) {
                    host.group = group;
                }
            }
            hosts.push(host);
        }

        this.setState({
            hosts: hosts,
        })
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
        const { classes } = this.props;

        return (
            <React.Fragment>
                <ChooseHostnameDialog
                    isOpen={this.state.dialogOpen}
                    handleClose={this.handleDialogClose}
                    handleOk={this.handleDialogOk}
                />

                <div>
                    {
                        this.state.hostsLoaded ?
                            this.state.hosts.length > 0 ?
                                <Paper>
                                    <List>
                                        {
                                            this.state.hosts.map((host) =>
                                                <HostComponent
                                                    key={host.hostname}
                                                    host={host} />
                                            )
                                        }
                                    </List>
                                </Paper> :
                                <Alert variant="outlined" severity="error">
                                    Hosts could not be loaded
                                </Alert>
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

export default withStyles(styles, { withTheme: true })(HostsComponent);
