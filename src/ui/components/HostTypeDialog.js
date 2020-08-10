import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import HostType from "../../data-classes/HostType";

class HostTypeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hostType: HostType.MASTER
        };
    }

    handleHostTypeChange = (event) => {
        this.setState({
            hostType: event.target.value
        })
    }

    render() {
        let hostTypes = [HostType.MASTER, HostType.WORKER];

        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.handleClose}
                fullWidth={true} >
                <DialogTitle id="alert-dialog-title">{"Choose cluster host type"}</DialogTitle>
                <DialogContent dividers>
                    <RadioGroup
                        name="host-type"
                        value={this.state.hostType}
                        onChange={this.handleHostTypeChange}
                    >
                        {hostTypes.map((hostType) => (
                            <FormControlLabel value={hostType} key={hostType} control={<Radio />} label={hostType} />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.handleOk(this.state.hostType)} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default HostTypeDialog;
