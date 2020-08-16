import {ADD_TASKS, TASKS_ERROR, TASKS_LOADED} from "../actions/get-tasks-action";
import {ADD_TASK} from "../actions/get-task-action";
import Task from "../../data-classes/Task";

const initialState = {
    tasks: [],
    error: "",
    loaded: false
};

const parseTask = (rawTask) => {
    let task = new Task();
    task.id = rawTask["uuid"]
    task.state = rawTask["state"]
    task.name = rawTask["kwargs"]
    task.datetime = rawTask["received"]
    return task;
}

const sortTasks = (tasks) => {
    return tasks.sort((a, b) => parseFloat(b.datetime) - parseFloat(a.datetime));
}

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASKS:
            let taskList = action.data;
            let taskIds = Object.keys(taskList);
            let tasks = [];
            for (let taskId of taskIds) {
                let task = parseTask(taskList[taskId]);
                tasks.push(task);
            }
            return {
                ...state,
                tasks: sortTasks(tasks),
                error: ""
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: sortTasks([
                    ...state.tasks,
                    parseTask(action.data)
                ])
            }
        case TASKS_ERROR:
            return {
                ...state,
                error: action.data,
                tasks: []
            }
        case TASKS_LOADED:
            return {
                ...state,
                loaded: true
            }
        default:
            return state;
    }
}
