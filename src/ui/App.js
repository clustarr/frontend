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
        console.log(inventoryList);

        let allHosts = Object.keys(inventoryList['_meta']['hostvars'])
        if (allHosts.length === 0) {
            return;
        }
        let runningHosts = inventoryList['running']['hosts'];

        let hosts = [];
        for (let hostname of runningHosts) {
            let host = new Host();
            host.hostname = hostname
            host.isRunning = true
            host.isInCluster = false
            hosts.push(host);
        }
        for (let hostname of allHosts) {
            if (runningHosts.includes(hostname)) {
                continue;
            }
            let host = new Host();
            host.hostname = hostname
            host.isRunning = false
            host.isInCluster = false
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
                                            hostname={host.hostname}
                                            isRunning={host.isRunning}
                                            isInCluster={host.isInCluster} />
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
