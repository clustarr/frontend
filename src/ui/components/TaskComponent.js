import React, {Component} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import PlaybookOutputDialog from "./PlaybookOutputDialog";

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
                <ListItem button key={`listitem-${this.props.task.id}`} onClick={this.openDialog}>
                    <ListItemText
                        id={`label-${this.props.task.id}`}
                        primary={`${this.props.task.state}: ${this.props.task.name}`}
                    />
                </ListItem>
            </React.Fragment>
        );
    }
}

export default TaskComponent;
