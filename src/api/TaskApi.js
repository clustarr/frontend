export default class TaskApi {
    static baseUrl = `http://${process.env.REACT_APP_FLOWER_HOST}:${process.env.REACT_APP_FLOWER_PORT}/api`

    static getTask(taskId) {
        return fetch(`${this.baseUrl}/task/info/${taskId}`)
            .then(response => response.json());
    }
}
