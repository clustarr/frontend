import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";

class RkeRemoveConfirmationDialog extends Component {
    render() {
        return (
            <Dialog
                open={true}
                onClose={this.props.handleClose}
            >
                <DialogTitle>
                    Remove Kubernetes cluster?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove Kubernetes cluster?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default RkeRemoveConfirmationDialog;
