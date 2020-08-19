export const ADD_HOSTS = "ADD_HOSTS";
export const HOSTS_ERROR = "HOSTS_ERROR";
export const HOSTS_LOADED = "HOSTS_LOADED";

const baseUrl = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api`;

export const addHosts = (hosts) => ({
    type: ADD_HOSTS,
    data: hosts,
});

export const hostsError = (message) => ({
    type: HOSTS_ERROR,
    data: message
});

export const hostsLoaded = () => ({
    type: HOSTS_LOADED
});

export const getHosts = () => async dispatch => {
    fetch(`${baseUrl}/inventory?inventory=/etc/ansible/proxmox.py`)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(hosts => {
            dispatch(addHosts(hosts));
        })
        .catch((error) => {
            console.log(error);
            dispatch(hostsError("Hosts could not be loaded"));
        })
        .finally(() => {
            dispatch(hostsLoaded());
        });
};
