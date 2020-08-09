export default class AnsibleApi {
    static baseUrl = 'http://localhost:5000/api'

    static listInventory() {
        return fetch(`${this.baseUrl}/inventory?inventory=/etc/ansible/proxmox.py`)
            .then(response => {
                return response.json();
            }).catch(error => {
                return error;
            });
    }
}
