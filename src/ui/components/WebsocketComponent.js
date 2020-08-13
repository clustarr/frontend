import {Component} from "react";
import {withSnackbar} from "notistack";
import TaskApi from "../../api/TaskApi";

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
            let playbook = await this.getPlaybook(taskId);

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

    getTaskArgs = async (taskId) => {
        let response = await TaskApi.getTask(taskId);
        let args = response.args;
        let argsList = [];
        for (let arg of args.slice(1, args.length-1).split(",")) {
            if (arg !== "") {
                argsList.push(arg);
            }
        }
        return argsList;
    }

    getPlaybook = async (taskId) => {
        let argsList = await this.getTaskArgs(taskId);
        let jsonStr = argsList[0].replaceAll('\'', '"');
        let json = JSON.parse(jsonStr);
        return json.playbook;
    }

    handleClose = () => {
        clearInterval(this.interval);
    }

    render() {
        return null;
    }
}

export default withSnackbar(WebsocketComponent);
