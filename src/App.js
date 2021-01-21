import React from 'react';
import dataHandler from './dataHandler/dataHandler';
import ClaimTile from './components/ClaimTile';
import ContractTile from './components/ContractTile';
import CreateContractForm from './components/CreateContractForm';
import { Button, Typography } from '@material-ui/core';
import './App.css';

class App extends React.Component {

	constructor() {
		super();

		this.state = {
			contracts: [],
			claims: [],
			createContractFormOpen: false
		}
	};

	componentDidMount() {
		this.refreshData();
	};

	refreshData = () => {
		// Fetching the contracts
		dataHandler.searchContracts()
			.then((res) => {
				this.setState({contracts: res.data})
			})
			.catch((error) => console.error(error));
		// Fetching the claims
		dataHandler.searchClaims()
			.then((res) => {
				this.setState({claims: res.data})
			})
			.catch((error) => console.error(error));
	};

	handleContractApprove = (data) => {
		dataHandler.approveContract(data)
			.then(() => this.refreshData())
			.catch((error) => console.log(error));
	};

	handleCreateClaim = (data) => {
		this.setState({createContractFormOpen: false})
	};

	handleCreateContract = (data) => {
		dataHandler.submitContract(data)
			.then(() => this.refreshData())
			.catch((error) => console.log(error));
	};

	handleOpenCreateContract = () =>  this.setState({createContractFormOpen: true});
	handleCloseCreateContract = () => this.setState({createContractFormOpen: false});

	render() {
		const contracts = this.state.contracts.map((contractData, index) => <ContractTile key={index} data={contractData} buttonText="Create claim" onApprove={this.handleContractApprove}/>)
		const claims = this.state.claims.map((claimData, index) => <ClaimTile key={index} data={claimData} buttonText="Edit claim" buttonOnChange={this.handleClaim}/>)

		return (
			<div className="App">
				<CreateContractForm isOpen={this.state.createContractFormOpen} onClose={this.handleCloseCreateContract} onSubmit={this.handleCreateContract}/>
				<div id="contracts">
					<Typography variant="h5" className="heading">Contracts</Typography>
					<div className="tiles">
						{contracts}
					</div>
					<div id="create-contract">
						<Button onClick={this.handleOpenCreateContract} variant="contained">Create Contract</Button>
					</div>
				</div>
				<div id="claims">
					<Typography variant="h5" className="heading">Claims</Typography>
					<div className="tiles">
						{claims}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
