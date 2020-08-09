import React, {Component} from 'react';
import './App.css';
import HostComponent from "./components/HostComponent";
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import AnsibleApi from "../api/AnsibleApi";
import Host from "../data-classes/Host";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hosts: []
        };
    }

    async componentDidMount() {
        let inventoryList = await AnsibleApi.listInventory();

        let allHosts = Object.keys(inventoryList['_meta']['hostvars'])

        let runningHosts = [];
        if (inventoryList['running']) {
            runningHosts = inventoryList['running']['hosts']
        }

        let masterHosts = [];
        if (inventoryList['masters']) {
            masterHosts = inventoryList['masters']['hosts']
        }

        let workerHosts = [];
        if (inventoryList['workers']) {
            workerHosts = inventoryList['workers']['hosts']
        }

        let hosts = [];
        for (let hostname of runningHosts) {
            let host = new Host();
            host.hostname = hostname
            host.running = true
            host.master = masterHosts.includes(hostname)
            host.worker = workerHosts.includes(hostname)
            hosts.push(host);
        }
        for (let hostname of allHosts) {
            if (runningHosts.includes(hostname)) {
                continue;
            }
            let host = new Host();
            host.hostname = hostname
            host.running = false
            host.master = masterHosts.includes(hostname)
            host.worker = workerHosts.includes(hostname)
            hosts.push(host);
        }

        this.setState({
            hosts: hosts,
        })
    }

    render() {
        return (
            <Container style={{ paddingTop: "1em" }}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={8}>
                        <Paper>
                            <List>
                                {
                                    this.state.hosts.map((host) =>
                                        <HostComponent
                                            key={host.hostname}
                                            host={host} />
                                    )
                                }
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default App;
