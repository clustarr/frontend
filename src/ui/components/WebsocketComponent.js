import React, {Component} from "react";
import {withSnackbar} from "notistack";

class WebsocketComponent extends Component {
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

        let variant = this.props.variant;
        this.websocket.onmessage = e => {
            let message = JSON.parse(e.data);
            console.log(message);
            this.props.enqueueSnackbar(this.props.message, { variant });
        }

        this.websocket.onclose = () => {
            console.log(`disconnected websocket ${this.websocket.url}`);
        }
    }

    handleClose = () => {
        clearInterval(this.interval);
    }

    render() {
        return null;
    }
}

export default withSnackbar(WebsocketComponent);
