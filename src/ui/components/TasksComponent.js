import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import TaskComponent from "./TaskComponent";
import {connect} from "react-redux";
import {getTasks} from "../../redux/actions/get-tasks-action";
import Alert from "@material-ui/lab/Alert";

class TasksComponent extends Component {
    render() {
        return (
            <div>
                {
                    this.props.loaded &&
                        this.props.error ?
                            <Alert variant="outlined" severity="error">
                                Tasks could not be loaded
                            </Alert>
                            :
                            this.props.tasks.length === 0 ?
                                <Alert variant="outlined" severity="info">
                                    No Tasks available
                                </Alert>
                                :
                                <Paper>
                                    <List>
                                        {
                                            this.props.tasks.map((task) =>
                                                <TaskComponent
                                                    key={task.id}
                                                    task={task} />
                                            )
                                        }
                                    </List>
                                </Paper>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: state.tasksReducer.tasks,
    error: state.tasksReducer.error,
    loaded: state.tasksReducer.loaded
});

const mapDispatchToProps = {
    getTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksComponent);
