const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'htma-genius-1',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const createClientProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateClientProfile', inputVars);
}
createClientProfileRef.operationName = 'CreateClientProfile';
exports.createClientProfileRef = createClientProfileRef;

exports.createClientProfile = function createClientProfile(dcOrVars, vars) {
  return executeMutation(createClientProfileRef(dcOrVars, vars));
};

const getHtmaReportRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHTMAReport', inputVars);
}
getHtmaReportRef.operationName = 'GetHTMAReport';
exports.getHtmaReportRef = getHtmaReportRef;

exports.getHtmaReport = function getHtmaReport(dcOrVars, vars) {
  return executeQuery(getHtmaReportRef(dcOrVars, vars));
};

const updateMineralReadingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMineralReading', inputVars);
}
updateMineralReadingRef.operationName = 'UpdateMineralReading';
exports.updateMineralReadingRef = updateMineralReadingRef;

exports.updateMineralReading = function updateMineralReading(dcOrVars, vars) {
  return executeMutation(updateMineralReadingRef(dcOrVars, vars));
};

const listUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsers');
}
listUsersRef.operationName = 'ListUsers';
exports.listUsersRef = listUsersRef;

exports.listUsers = function listUsers(dc) {
  return executeQuery(listUsersRef(dc));
};
