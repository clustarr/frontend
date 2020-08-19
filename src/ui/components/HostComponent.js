import React, {Component} from "react";
import {Cloud, Delete, PowerSettingsNew} from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot, faServer} from '@fortawesome/free-solid-svg-icons';
import AnsibleApi from "../../api/AnsibleApi";
import AddHostToClusterDialog from "./AddHostToClusterDialog";
import HostGroups from "../../data-classes/HostGroups";
import DeleteHostConfirmationDialog from "./DeleteHostConfirmationDialog";

class HostComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clusterDialogOpen: false,
            deleteDialogOpen: false
        };
    }

    openClusterDialog = () => {
        this.setState({
            clusterDialogOpen: true
        });
    };

    handleClusterDialogClose = () => {
        this.setState({
            clusterDialogOpen: false
        });
    };

    handleClusterDialogOk = async (hostType, rkeUp) => {
        this.handleClusterDialogClose();

        let group = `${hostType}s`;
        await AnsibleApi.runPlaybook({
            "playbook": "add-node-to-cluster.yml",
            "extra_vars": {
                "hostname": this.props.host.hostname,
                "group": group,
                "rkeUp": rkeUp
            }
        });
    };

    openDeleteDialog = async () => {
        this.setState({
            deleteDialogOpen: true
        });
    };

    handleDeleteDialogClose = () => {
        this.setState({
            deleteDialogOpen: false
        });
    };

    handleDeleteDialogOk = async (rkeUp) => {
        this.handleDeleteDialogClose();

        await AnsibleApi.runPlaybook({
            "playbook": "remove-node.yml",
            "extra_vars": {
                "hostname": this.props.host.hostname,
                "rkeUp": rkeUp
            }
        });
    };

    render() {
        let isMaster = this.props.host.group === HostGroups.MASTERS;
        let isWorker = this.props.host.group === HostGroups.WORKERS;
        let isClusterNode = isMaster || isWorker;

        let faStyle = {
            width: "24px",
            color: "initial"
        };

        return (
            <React.Fragment>
                {
                    this.state.clusterDialogOpen &&
                    <AddHostToClusterDialog
                        handleClose={this.handleClusterDialogClose}
                        handleOk={this.handleClusterDialogOk}
                    />
                }

                {
                    this.state.deleteDialogOpen &&
                    <DeleteHostConfirmationDialog
                        handleClose={this.handleDeleteDialogClose}
                        handleOk={this.handleDeleteDialogOk}
                        host={this.props.host}
                    />
                }

                <ListItem
                    key={`listitem-${this.props.host.hostname}`}
                    disabled={!this.props.host.group}
                >
                    <ListItemText
                        id={`label-${this.props.host.hostname}`}
                        primary={this.props.host.hostname}
                    />
                    <ListItemSecondaryAction>
                        <Tooltip
                            title={"host is powered " + (this.props.host.running ? "on" : "off")}
                        >
                            <span>
                                <IconButton
                                    color="inherit"
                                    disabled={true}
                                >
                                    <PowerSettingsNew style={this.props.host.running ? {color: "initial"} : {}}/>
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip
                            title={
                                !this.props.host.group ?
                                    "" :
                                    isMaster ?
                                        "host is a master" :
                                        isWorker ?
                                            "host is a worker" :
                                            "add host to cluster"
                            }>
                            <span>
                                <IconButton
                                    aria-label={isClusterNode ? "" : "add host to cluster"}
                                    color="inherit"
                                    disabled={isClusterNode || !this.props.host.group}
                                    onClick={this.openClusterDialog}>
                                    {
                                        isClusterNode ?
                                            isMaster ?
                                                <FontAwesomeIcon icon={faServer} style={faStyle}/> :
                                                <FontAwesomeIcon icon={faRobot} style={faStyle}/>
                                            : <Cloud/>
                                    }
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title={!this.props.host.group ? "" : "delete host"}>
                            <span>
                                <IconButton
                                    aria-label="delete host"
                                    color="inherit"
                                    onClick={this.openDeleteDialog}
                                    disabled={!this.props.host.group}
                                >
                                    <Delete/>
                                </IconButton>
                            </span>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>
            </React.Fragment>
        );
    }
}

export default HostComponent;
