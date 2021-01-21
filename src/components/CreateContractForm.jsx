import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';


class CreateContractForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            description: '',
            amount: '',
            formName: '',
            formAddress: '',
            formLines: [],
            canSubmit: false
        };
    }

    handleOnClose = () => {
        this.setState({
            description: '',
            amount: '',
            formName: '',
            formAddress: '',
            formLines: [],
            canSubmit: false
        }, this.props.onClose());
    };

    handleInsertLine = () => {
        const lines = this.state.formLines;
        lines.push({text: this.state.description, originalValue: this.state.amount, currentValue: this.state.amount});
        this.setState({
            formLines: lines,
            description: '',
            amount: ''
        });
    }

    createSubmissionData = () => {
        const submissionData = {
            name: this.state.formName,
            address: this.state.formAddress,
            lines: this.state.formLines
        };
        return submissionData;
    };

    handleOnSubmit = (data) => {
        this.props.onSubmit(data);
        this.handleOnClose();
    }

    render() {
        const lines = this.state.formLines.map((line, index) => {
            return <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{line.text}</TableCell>
                <TableCell>${line.originalValue}</TableCell>
            </TableRow>
        });
        return (
            <Dialog fullWidth open={this.props.isOpen} onClose={this.props.onClose}>
                <DialogTitle>Create Contract</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required margin="dense" label="Name" fullWidth onChange={(e) => this.setState({formName: e.target.value})}/>
                    <TextField required margin="dense" label="Address" fullWidth onChange={(e) => this.setState({formAddress: e.target.value})}/>
                    <div id="create-contract-line-inputs">
                        <TextField onChange={(e) => this.setState({description: e.target.value})} value={this.state.description} margin="dense" label="Description" />
                        <TextField onChange={(e) => this.setState({amount: e.target.value})} value={this.state.amount} margin="dense" type="number" label="Amount" />
                        <Button disabled={!this.state.description || !this.state.amount} onClick={this.handleInsertLine}>Insert line</Button>
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lines}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleOnClose} color="primary">
                        Cancel
                     </Button>
                    <Button variant="outlined" disabled={!this.state.formAddress || !this.state.formName || !this.state.formLines.length} onClick={() => this.handleOnSubmit(this.createSubmissionData())} color="primary">
                        Submit
                     </Button>
                </DialogActions>
            </Dialog>
        );
    }

};

export default CreateContractForm;
