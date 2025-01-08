const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Try_All_Frameworks',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

