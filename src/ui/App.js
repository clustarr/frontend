import React, {Component} from 'react';
import './App.css';
import HostComponent from "./components/HostComponent";
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";

class App extends Component {
    render() {
        return (
            <Container style={{ paddingTop: "1em" }}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={8}>
                        <Paper>
                            <List>
                                <HostComponent hostname="Hostname1" isPoweredOn={true} isInCluster={true} />
                                <HostComponent hostname="Hostname2" isPoweredOn={false} isInCluster={false} />
                                <HostComponent hostname="Hostname2" isPoweredOn={true} isInCluster={false} />
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default App;
