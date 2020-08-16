import {Component} from "react";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import {setTaskStateFailed, setTaskStateSucceeded} from "../../redux/actions/set-task-state";
import {getTask} from "../../redux/actions/get-task-action";

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

            let taskId = message["uuid"];
            let messageType = message["type"];
            if (messageType === "task-started") {
                this.props.getTask(taskId);
            } else if (messageType === "task-succeeded") {
                this.props.setTaskStateSucceeded(taskId);
            } else if (messageType === "task-failed") {
                this.props.setTaskStateFailed(taskId);
            }
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

const mapStateToProps = (state) => ({
    tasks: state.tasksReducer.tasks
});

const mapDispatchToProps = {
    setTaskStateSucceeded,
    setTaskStateFailed,
    getTask
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(WebsocketComponent));
