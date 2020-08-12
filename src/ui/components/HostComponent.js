import React, {Component} from "react";
import { Delete, Cloud, PowerSettingsNew } from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faServer, faRobot } from '@fortawesome/free-solid-svg-icons'
import AnsibleApi from "../../api/AnsibleApi";
import HostTypeDialog from "./HostTypeDialog";

class HostComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        };
    }

    deleteHost = async () => {
        await AnsibleApi.runPlaybook({
            "playbook": "remove-node.yml",
            "extra_vars": {
                "hostname": this.props.host.hostname
            }
        });
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

    handleDialogOk = async (hostType) => {
        this.handleDialogClose();

        let group = `${hostType}s`;
        await AnsibleApi.runPlaybook({
            "playbook": "add-node-to-cluster.yml",
            "extra_vars": {
                "hostname": this.props.host.hostname,
                "group": group
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <HostTypeDialog
                    isOpen={this.state.dialogOpen}
                    handleClose={this.handleDialogClose}
                    handleOk={this.handleDialogOk} />

                <ListItem key={`listitem-${this.props.host.hostname}`}>
                    <ListItemText id={`label-${this.props.host.hostname}`} primary={this.props.host.hostname} />
                    <ListItemSecondaryAction>
                        <Tooltip title={"host is powered " + (this.props.host.running ? "on": "off")}>
                            <span>
                                <IconButton color="inherit" disabled={true}>
                                    <PowerSettingsNew style={this.props.host.running? {color: "initial"}: {}}/>
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip
                            title={
                                this.props.host.master ? "host is a master" :
                                    this.props.host.worker ? "host is a worker" :
                                        "add host to cluster" }>
                            <span>
                                <IconButton
                                    aria-label={
                                        (this.props.host.master || this.props.host.worker) ? "" :
                                        "add host to cluster"
                                    }
                                    color="inherit"
                                    disabled={this.props.host.master || this.props.host.worker}
                                    onClick={this.openDialog} >
                                    {(this.props.host.master || this.props.host.worker) ?
                                        this.props.host.master ?
                                            <FontAwesomeIcon icon={faServer} style={{width: "24px"}} /> :
                                            <FontAwesomeIcon icon={faRobot} style={{width: "24px"}} />
                                        : <Cloud/>
                                    }
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title="delete host">
                            <IconButton aria-label="delete host" color="inherit" onClick={this.deleteHost}>
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>
            </React.Fragment>
        );
    }
}

export default HostComponent;