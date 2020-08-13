import {Component} from "react";
import {withSnackbar} from "notistack";
import TaskApi from "../../api/TaskApi";
import TaskApiHelper from "../../api/TaskApiHelper";

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

        this.websocket.onmessage = async e => {
            let message = JSON.parse(e.data);
            console.log(message);

            let taskId = message.uuid;
            let task = await TaskApi.getTask(taskId);
            let playbook = TaskApiHelper.getPlaybook(task);

            let variant = this.props.variant;

            this.props.enqueueSnackbar(
                `Playbook ${playbook} ${this.props.suffix}`,
                {variant}
            );
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
