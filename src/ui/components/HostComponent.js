import React, {Component} from "react";
import { Delete, Cloud, CloudOff, Power, PowerOff, PowerSettingsNew } from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";

class HostComponent extends Component {
    render() {
        let powerIcon;
        if (this.props.isPoweredOn) {
            powerIcon = <PowerSettingsNew style={{color: "initial"}}/>;
        } else {
            powerIcon = <PowerSettingsNew/>;
        }

        let cloudIcon;
        if (this.props.isInCluster) {
            cloudIcon = <Cloud/>
        } else {
            cloudIcon = <CloudOff/>
        }

        return (
            <ListItem key={`listitem-${this.props.hostname}`}>
                <ListItemText id={`label-${this.props.hostname}`} primary={this.props.hostname} />
                <ListItemSecondaryAction>
                    <IconButton aria-label="add host to cluster" color="inherit" disabled={true}>
                        {powerIcon}
                    </IconButton>

                    <IconButton aria-label="add host to cluster" color="inherit" disabled={false}>
                        {cloudIcon}
                    </IconButton>

                    <IconButton aria-label="delete host" color="inherit" disabled={false}>
                        <Delete/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default HostComponent;
