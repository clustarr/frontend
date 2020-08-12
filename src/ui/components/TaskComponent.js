import React, {Component} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import PlaybookOutputDialog from "./PlaybookOutputDialog";
import AnsibleApi from "../../api/AnsibleApi";

class TaskComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        };
    }

    openDialog = async () => {
        await this.getOutput();
        this.interval = setInterval(this.getOutput, 1000)
    }

    getOutput = async () => {
        let response = await AnsibleApi.getPlaybookOutput(this.props.task.id);
        let taskOutput = response.output
        this.setState({
            dialogOpen: true,
            taskOutput: taskOutput
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        })
        clearInterval(this.interval);
    }

    render() {
        return (
            <React.Fragment>
                <PlaybookOutputDialog
                    isOpen={this.state.dialogOpen}
                    handleClose={this.handleDialogClose}
                    task={this.props.task}
                    taskOutput={this.state.taskOutput}
                />
                <ListItem button key={`listitem-${this.props.task.id}`} onClick={this.openDialog}>
                    <ListItemText id={`label-${this.props.task.id}`} primary={this.props.task.state + " | " + this.props.task.id} />
                </ListItem>
            </React.Fragment>
        );
    }
}

export default TaskComponent;
