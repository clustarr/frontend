export default class AnsibleApi {
    static baseUrl = 'http://localhost:5000/api'

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

    static listInventory() {
        return fetch(`${this.baseUrl}/inventory?inventory=/etc/ansible/proxmox.py`)
            .then(response => response.json());
    }
}
