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
}
