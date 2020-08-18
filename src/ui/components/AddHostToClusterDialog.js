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
import Switch from "@material-ui/core/Switch";
import FormLabel from "@material-ui/core/FormLabel";

class AddHostToClusterDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hostType: HostType.MASTER,
            rkeUp: true
        };
    }

    handleHostTypeChange = (event) => {
        this.setState({
            hostType: event.target.value
        })
    }

    handleRkeUpChange = (event) => {
        this.setState({
            rkeUp: event.target.checked
        })
    }

    render() {
        let hostTypes = [HostType.MASTER, HostType.WORKER];

        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.handleClose}
                fullWidth={true} >
                <DialogTitle>
                    Add host to cluster
                </DialogTitle>
                <DialogContent dividers>
                    <FormLabel component="legend">
                        Host type
                    </FormLabel>
                    <RadioGroup
                        row
                        name="host-type"
                        value={this.state.hostType}
                        onChange={this.handleHostTypeChange}
                    >
                        {hostTypes.map((hostType) => (
                            <FormControlLabel
                                value={hostType}
                                key={hostType}
                                control={
                                    <Radio />
                                }
                                label={hostType}
                            />
                        ))}
                    </RadioGroup>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.handleOk(this.state.hostType, this.state.rkeUp)} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddHostToClusterDialog;
