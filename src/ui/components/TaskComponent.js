import React, {Component} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import PlaybookOutputDialog from "./PlaybookOutputDialog";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Done, ErrorOutline} from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";

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
                                this.props.task.state === "FAILURE" ?
                                    <ErrorOutline /> :
                                    <CircularProgress size={24}/>
                        }
                    </ListItemIcon>
                    <ListItemText
                        id={`label-${this.props.task.id}`}
                        primary={this.props.task.name}
                    />
                </ListItem>
            </React.Fragment>
        );
    }
}

export default TaskComponent;
