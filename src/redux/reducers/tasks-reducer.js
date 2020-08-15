import {ADD_TASKS, CLEAR_TASKS, TASKS_ERROR, TASKS_LOADED} from "../actions/tasks-actions";
import Task from "../../data-classes/Task";

const initialState = {
    tasks: [],
    error: "",
    loaded: false
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASKS:
            let taskList = action.data;
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
            return {
                ...state,
                tasks: tasksSorted
            };
        case TASKS_ERROR:
            return {
                ...state,
                error: action.data
            }
        case TASKS_LOADED:
            return {
                ...state,
                loaded: true
            }
        case CLEAR_TASKS:
            return initialState;
        default:
            return state;
    }
}
