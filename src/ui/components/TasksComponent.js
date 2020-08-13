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
            isLoaded: false,
            error: false,
            tasks: []
        };
    }

    async componentDidMount() {
        this.getTasks();
        this.interval = setInterval(this.getTasks, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getTasks = () => {
        TaskApi.listTasks()
            .then(taskList => {
                console.log(taskList);

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
                    isLoaded: true,
                    error: false,
                    tasks: tasksSorted,
                })
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    isLoaded: true,
                    error: true
                });
            });
    }

    render() {
        if (this.state.isLoaded) {
            if (this.state.error) {
                return <Alert variant="outlined" severity="error">
                    Tasks could not be loaded
                </Alert>
            }

            if (this.state.tasks.length === 0) {
                return <Alert variant="outlined" severity="info">
                    No Tasks available
                </Alert>
            } else {
                return <Paper>
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
            }
        }
        return null;
    }
}

export default TasksComponent;
