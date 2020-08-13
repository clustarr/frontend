import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AnsibleApi from "../../api/AnsibleApi";

class PlaybookOutputDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskOutput: ""
        };
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen === false && this.props.isOpen === true) {
            await this.getOutput();
            this.interval = setInterval(this.getOutput, 1000)
        }
        if (prevProps.isOpen === true && this.props.isOpen === false) {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getOutput = async () => {
        AnsibleApi.getPlaybookOutput(this.props.task.id)
            .then(response => {
                let taskOutput = response.output
                this.setState({
                    taskOutput: taskOutput
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.handleClose}
                scroll="paper"
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle id="scroll-dialog-title">Playbook Output</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <Typography component="span" variant="body1" style={{whiteSpace: 'pre-line'}}>
                            {this.state.taskOutput}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default PlaybookOutputDialog;
