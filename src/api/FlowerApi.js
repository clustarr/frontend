export default class FlowerApi {
    static baseUrl = `http://${process.env.REACT_APP_FLOWER_HOST}:${process.env.REACT_APP_FLOWER_PORT}/api`;

    static cancelTask(taskId) {
        const requestOptions = {
            method: 'POST'
        };
        return fetch(`${this.baseUrl}/task/revoke/${taskId}?terminate=true`, requestOptions)
            .then(response => response.json());
    }
}
