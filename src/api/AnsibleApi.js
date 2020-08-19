export default class AnsibleApi {
    static baseUrl = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api`;

    static runPlaybook(body) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
        return fetch(`${this.baseUrl}/playbook`, requestOptions)
            .then(response => response.json());
    }

    static getPlaybookOutput(taskId) {
        return fetch(`${this.baseUrl}/playbook/${taskId}`)
            .then(response => response.json());
    }
}
