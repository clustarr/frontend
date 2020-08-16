import {ADD_HOSTS, HOSTS_ERROR, HOSTS_LOADED} from "../actions/get-hosts-action";
import Host from "../../data-classes/Host";
import HostGroups from "../../data-classes/HostGroups";

const initialState = {
    hosts: [],
    error: "",
    loaded: false
};

export const hostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_HOSTS:
            let inventoryList = action.data;

            let allHosts = Object.keys(inventoryList['_meta']['hostvars'])

            let runningHosts = [];
            if (inventoryList['running']) {
                runningHosts = inventoryList['running']['hosts']
            }

            let hosts = [];
            for (let hostname of allHosts) {
                let host = new Host();
                host.hostname = hostname;
                host.running = runningHosts.includes(hostname);
                for (let group of [HostGroups.MASTERS, HostGroups.WORKERS, HostGroups.INDEPENDENTS]) {
                    let groupHosts = []
                    if (inventoryList[group]) {
                        groupHosts = inventoryList[group]['hosts']
                    }
                    if (groupHosts.includes(hostname)) {
                        host.group = group;
                    }
                }
                hosts.push(host);
            }
            return {
                ...state,
                hosts: hosts,
                error: ""
            }
        case HOSTS_ERROR:
            return {
                ...state,
                error: action.data,
                hosts: []
            }
        case HOSTS_LOADED:
            return {
                ...state,
                loaded: true
            }
        default:
            return state;
    }
}
