import React, {Component} from "react";
import { Delete, Cloud, CloudOff, Power, PowerOff, PowerSettingsNew } from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

class HostComponent extends Component {
    render() {
        return (
            <ListItem key={`listitem-${this.props.hostname}`}>
                <ListItemText id={`label-${this.props.hostname}`} primary={this.props.hostname} />
                <ListItemSecondaryAction>
                    <Tooltip title={"Host is powered " + (this.props.isPoweredOn ? "on": "off")}>
                        <span>
                            <IconButton color="inherit" disabled={true}>
                                <PowerSettingsNew style={this.props.isPoweredOn? {color: "initial"}: {}}/>
                            </IconButton>
                        </span>
                    </Tooltip>

                    <Tooltip title="add host to cluster">
                        <IconButton aria-label="add host to cluster" color="inherit" disabled={false}>
                            {this.props.isInCluster ? <Cloud/> : <CloudOff/>}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="delete host">
                        <IconButton aria-label="delete host" color="inherit" disabled={false}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default HostComponent;
