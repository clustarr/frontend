export const SET_TASK_STATE = "SET_TASK_STATE";

const setTaskState = (taskId, state) => ({
    type: SET_TASK_STATE,
    data: {
        taskId,
        state
    },
});

export const setTaskStateSucceeded = (taskId) => {
    return setTaskState(taskId, "SUCCESS");
}

export const setTaskStateFailed = (taskId) => {
    return setTaskState(taskId, "FAILURE");
}
