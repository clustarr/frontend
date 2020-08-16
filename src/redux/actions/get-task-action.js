export const ADD_TASK = "ADD_TASK";

const baseUrl = `http://${process.env.REACT_APP_FLOWER_HOST}:${process.env.REACT_APP_FLOWER_PORT}/api`

export const addTask = (task) => ({
    type: ADD_TASK,
    data: task,
});

export const getTask = (taskId) => async dispatch => {
    fetch(`${baseUrl}/task/info/${taskId}`)
        .then(response => response.json())
        .then(task => {
            dispatch(addTask(task));
        })
        .catch((error) => {
            console.log(error);
        });
};
