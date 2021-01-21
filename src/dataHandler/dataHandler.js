const axios = require('axios').default;

const searchContracts = (data) => {
    return axios.get('contracts', {params: data});
}

const approveContract = (data) => {
    const approvedData = JSON.parse(JSON.stringify(data));
    approvedData.state = "APPROVED";
    return axios.put(`contract/${approvedData.id}`, approvedData);
}

const submitContract = (data) => {
    console.log(data)
    return axios.post('contract', data);
}

const searchClaims = (data) => {
    return axios.get('claims', {params: data});
}

module.exports = {
    approveContract,
    searchContracts,
    submitContract,
    searchClaims
}