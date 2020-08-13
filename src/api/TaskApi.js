export default class TaskApi {
    static baseUrl = 'http://localhost:5555/api'

    static listTasks() {
        return fetch(`${this.baseUrl}/tasks`)
            .then(response => {
                return response.json();
            }).catch(error => {
                return error;
            });
    }

    static getTask(taskId) {
        return fetch(`${this.baseUrl}/task/info/${taskId}`)
            .then(response => {
                return response.json();
            }).catch(error => {
                return error;
            });
    }
}
