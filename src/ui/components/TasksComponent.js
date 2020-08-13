import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import TaskApi from "../../api/TaskApi";
import Task from "../../data-classes/Task";
import TaskComponent from "./TaskComponent";
import Alert from "@material-ui/lab/Alert";

class TasksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    async componentDidMount() {
        await this.getTasks();
        this.interval = setInterval(this.getTasks, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getTasks = async () => {
        let taskList = await TaskApi.listTasks();

        let taskIds = Object.keys(taskList);

        let tasks = [];
        for (let taskId of taskIds) {
            let task = new Task();
            task.id = taskId
            task.state = taskList[taskId]["state"]
            task.name = taskList[taskId]["kwargs"]
            task.datetime = taskList[taskId]["received"]
            tasks.push(task);
        }

        let tasksSorted = tasks.sort((a, b) => parseFloat(b.datetime) - parseFloat(a.datetime));

        this.setState({
            tasks: tasksSorted,
        })
    }

    render() {
        if (this.state.tasks.length === 0) {
            return <Alert variant="outlined" severity="error">
                Tasks could not be loaded
            </Alert>
        }

        return (
            <Paper>
                <List>
                    {
                        this.state.tasks.map((task) =>
                            <TaskComponent
                                key={task.id}
                                task={task} />
                        )
                    }
                </List>
            </Paper>
        )
    }
}

export default TasksComponent;
