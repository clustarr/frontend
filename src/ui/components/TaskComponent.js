import React, {Component} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import PlaybookOutputDialog from "./PlaybookOutputDialog";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Cancel, Delete, Done, ErrorOutline} from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AnsibleApi from "../../api/AnsibleApi";
import FlowerApi from "../../api/FlowerApi";

class TaskComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        };
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

    cancelTask = async () => {
        await FlowerApi.cancelTask(this.props.task.id);
    }

    render() {
        return (
            <React.Fragment>
                <PlaybookOutputDialog
                    isOpen={this.state.dialogOpen}
                    handleClose={this.handleDialogClose}
                    task={this.props.task}
                />
                <ListItem
                    button
                    key={`listitem-${this.props.task.id}`}
                    onClick={this.openDialog}
                >
                    <ListItemIcon>
                        {
                            this.props.task.state === "SUCCESS" ?
                                <Done /> :
                                (this.props.task.state === "FAILURE" || this.props.task.state === "REVOKED") ?
                                    <ErrorOutline /> :
                                    <CircularProgress size={24}/>
                        }
                    </ListItemIcon>
                    <ListItemText
                        id={`label-${this.props.task.id}`}
                        primary={this.props.task.name}
                    />
                    <ListItemSecondaryAction>
                        {
                            !(
                                this.props.task.state === "SUCCESS" ||
                                this.props.task.state === "FAILURE" ||
                                this.props.task.state === "REVOKED"
                            ) &&
                            <Tooltip title="cancel task">
                                <IconButton
                                    aria-label="cancel task"
                                    onClick={this.cancelTask}
                                >
                                    <Cancel/>
                                </IconButton>
                            </Tooltip>
                        }
                    </ListItemSecondaryAction>
                </ListItem>
            </React.Fragment>
        );
    }
}

export default TaskComponent;
