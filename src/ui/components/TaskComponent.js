import React, {Component} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

class TaskComponent extends Component {
    render() {
        return (
            <ListItem button key={`listitem-${this.props.task.id}`} onClick={() => {}}>
                <ListItemText id={`label-${this.props.task.id}`} primary={this.props.task.state + " | " + this.props.task.id} />
            </ListItem>
        );
    }
}

export default TaskComponent;
