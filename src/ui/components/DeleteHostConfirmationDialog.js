import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import HostGroups from "../../data-classes/HostGroups";

class DeleteHostConfirmationDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rkeUp: true
        }
    }

    handleRkeUpChange = (event) => {
        this.setState({
            rkeUp: event.target.checked
        })
    }

    render() {
        return (
            <Dialog
                open={true}
                onClose={this.props.handleClose}
            >
                <DialogTitle>
                    Delete host
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the host {this.props.host.hostname}?
                    </DialogContentText>
                    {
                        (this.props.host.group === HostGroups.MASTERS || this.props.host.group === HostGroups.WORKERS) &&
                        <div>
                            <br/>
                            <FormLabel component="legend">
                                RKE up
                            </FormLabel>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.rkeUp}
                                        onChange={this.handleRkeUpChange}
                                        name="rkeUp"
                                        color="primary"
                                    />
                                }
                                label="automatically"
                            />
                        </div>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.handleOk(this.state.rkeUp)} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default DeleteHostConfirmationDialog;
