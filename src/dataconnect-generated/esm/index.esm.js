import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'htma-genius-1',
  location: 'us-central1'
};

export const createClientProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateClientProfile', inputVars);
}
createClientProfileRef.operationName = 'CreateClientProfile';

export function createClientProfile(dcOrVars, vars) {
  return executeMutation(createClientProfileRef(dcOrVars, vars));
}

export const getHtmaReportRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHTMAReport', inputVars);
}
getHtmaReportRef.operationName = 'GetHTMAReport';

export function getHtmaReport(dcOrVars, vars) {
  return executeQuery(getHtmaReportRef(dcOrVars, vars));
}

export const updateMineralReadingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMineralReading', inputVars);
}
updateMineralReadingRef.operationName = 'UpdateMineralReading';

export function updateMineralReading(dcOrVars, vars) {
  return executeMutation(updateMineralReadingRef(dcOrVars, vars));
}

export const listUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsers');
}
listUsersRef.operationName = 'ListUsers';

export function listUsers(dc) {
  return executeQuery(listUsersRef(dc));
}

