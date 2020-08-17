import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class ChooseHostnameDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hostname: `clustarr-${this.generateGuid()}`
        };
    }

    generateGuid = () => {
        // https://stackoverflow.com/a/13403498
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    handleHostTypeChange = (event) => {
        this.setState({
            hostname: event.target.value
        })
    }

    render() {
        return (
            <Dialog
                open={true}
                onClose={this.props.handleClose}
                fullWidth={true} >
                <DialogTitle id="alert-dialog-title">Choose Hostname</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="hostname"
                        label="Hostname"
                        type="text"
                        fullWidth
                        value={this.state.hostname}
                        onChange={this.handleHostTypeChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.handleOk(this.state.hostname)} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ChooseHostnameDialog;
