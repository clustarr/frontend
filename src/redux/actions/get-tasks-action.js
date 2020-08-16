export const ADD_TASKS = "ADD_TASKS";
export const TASKS_ERROR = "TASKS_ERROR";
export const TASKS_LOADED = "TASKS_LOADED";

const baseUrl = `http://${process.env.REACT_APP_FLOWER_HOST}:${process.env.REACT_APP_FLOWER_PORT}/api`

export const addTasks = (tasks) => ({
    type: ADD_TASKS,
    data: tasks,
});

export const tasksError = (message) => ({
    type: TASKS_ERROR,
    data: message
})

export const tasksLoaded = () => ({
    type: TASKS_LOADED
})

export const getTasks = () => async dispatch => {
    fetch(`${baseUrl}/tasks`)
        .then(response => response.json())
        .then(tasks => {
            dispatch(addTasks(tasks));
        })
        .catch((error) => {
            console.log(error);
            dispatch(tasksError("Tasks could not be loaded"))
        })
        .finally(() => {
            dispatch(tasksLoaded());
        });
};
