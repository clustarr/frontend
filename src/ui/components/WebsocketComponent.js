import React, {Component} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

class WebsocketComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        }
    }

    componentDidMount() {
        this.connectWebsocket();
        this.interval = setInterval(this.checkWebsocket, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    checkWebsocket = () => {
        if (!this.websocket || this.websocket.readyState === WebSocket.CLOSED) {
            this.connectWebsocket();
        }
    }

    connectWebsocket = () => {
        this.websocket = new WebSocket(this.props.url);

        this.websocket.onopen = () => {
            console.log(`connected websocket ${this.websocket.url}`);
        }

        this.websocket.onmessage = e => {
            let message = JSON.parse(e.data);
            console.log(message);
            this.setState({
                dialogOpen: true
            })
        }

        this.websocket.onclose = () => {
            console.log(`disconnected websocket ${this.websocket.url}`);
        }
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false
        })
        clearInterval(this.interval);
    }

    render() {
        return (
            <Snackbar open={this.state.dialogOpen} autoHideDuration={6000} onClose={this.handleClose}>
                <MuiAlert elevation={6} variant="filled" severity={this.props.severity} onClose={this.handleClose}>
                    {this.props.message}
                </MuiAlert>
            </Snackbar>
        )
    }
}

export default WebsocketComponent;
